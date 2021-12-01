/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { digitsFaToEn } = require("@persian-tools/persian-tools");
const randomize = require("randomatic");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions).status(statusCode).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new AppError("you dont have permision to perform this action", 403)
      );
    }

    next();
  };
};

exports.teacherSignup = catchAsync(async (req, res, next) => {
  let { phoneNumber, confirmCode: code } = req.body;

  if (!phoneNumber || !code) {
    return next(new AppError("please give phoneNumber and code", 400));
  }

  if (!phoneNumber.trim() || !code.trim()) {
    return next(new AppError("please give phoneNumber and code", 400));
  }

  phoneNumber = digitsFaToEn(phoneNumber);
  code = digitsFaToEn(code);

  const orginalCode = await redis.getAsync(phoneNumber);
  if (!orginalCode) {
    return next(new AppError("for this number there is no code", 404));
  }

  if (orginalCode !== code) {
    return next(new AppError("code is wrong", 403));
  }
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    nationalCode: req.body.nationalCode,
    role: "teacher",
  });

  createSendToken(newUser, 201, res);
});

exports.teacherLogin = catchAsync(async (req, res, next) => {
  let { phoneNumber, confirmCode: code } = req.body;

  // 0) check code and phoneNumber
  if (!phoneNumber || !code) {
    return next(new AppError("please give phoneNumber and code", 400));
  }

  if (!phoneNumber.trim() || !code.trim()) {
    return next(new AppError("please give phoneNumber and code", 400));
  }

  // 1) fa to eng phoneNumber and code
  phoneNumber = digitsFaToEn(phoneNumber);
  code = digitsFaToEn(code);
  // 2) check code exist
  const orginalCode = await redis.getAsync(phoneNumber);
  if (!orginalCode) {
    return next(new AppError("for this number there is no code", 404));
  }
  // 3) check code verfication
  if (orginalCode !== code) {
    return next(new AppError("code is wrong", 403));
  }
  // 4) if phoneNumber
  if (!phoneNumber) {
    return next(new AppError("please provide phoneNumber", 400));
  }
  // 5) check if user exists
  const user = await User.findOne({ phoneNumber });
  if (!user || user.role !== "teacher") {
    return next(new AppError("Incorrect phoneNumber", 401));
  }

  // 6) if everything ok send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) get jwt token and check it
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! please log into to get access.", 401)
    );
  }
  // 2) verfication token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) check if user still exist
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("the token belonging to this user does not exist", 401)
    );
  }

  // Grant access to protect route
  req.user = freshUser;
  next();
});

exports.createCode = catchAsync(async (req, res, next) => {
  let { phoneNumber } = req.body;
  phoneNumber = digitsFaToEn(phoneNumber);

  const check = await redis.getAsync(phoneNumber);
  if (check) {
    const ttl = await redis.ttl(phoneNumber);
    return next(new AppError(`لطفا ${ttl} ثانیه دیکر تلاش کنید`, 405));
  }

  const code = randomize("0", 4);
  await redis.setex(phoneNumber, 120, code);

  console.log("code for sms ==>", code);

  res.status(201).json({
    status: "success",
  });
});

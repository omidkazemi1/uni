const jwt = require("jsonwebtoken");
const { promisify } = require("util");
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

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    data: {
      user: user,
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
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    nationalCode: req.body.nationalCode,
    role: "teacher",
  });

  createSendToken(newUser, 201, res);
});

exports.createCode = catchAsync(async (req, res, next) => {
  const { send, check, phoneNumber, code } = req.body;
  if (send && !check) {
    const setParams = { key: phoneNumber, ex: 120, value: randomize("0", 4) };
    await this.redisClient("set", { ...setParams });
    const smsCode = await this.redisClient("get", { key: phoneNumber });
    console.log("phoneNumber, smsCode :>> ", phoneNumber, smsCode);
    return;
    // send sms
  }
  if (check && !send) {
    const smsCode = await this.redisClient("get", { key: phoneNumber });
    return res.send(smsCode === code);
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) if email and password exist
  if (!email || !password) {
    return next(new AppError("please provide email and password", 400));
  }
  // 2) check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email and password", 401));
  }

  // 3) if everything ok send token to client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) get jwt token and check it
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookie.jwt) {
    token = req.cookie.jwt;
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
      new AppError("the token belonging to this user does not exist ", 401)
    );
  }
  // 4) check if user changed password jwt issue
  if (await freshUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError("You recently change Password please log in again!", 401)
    );
  }

  // Grant access to protect route
  req.user = freshUser;
  next();
});

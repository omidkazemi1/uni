const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");

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
    token,
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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get User based on user email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("there is now user with this email", 404));
  }

  // 2) reset token random
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `forgot your password? submit ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "your password reset link",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "your password link send",
    });
  } catch (err) {
    user.userPasswordResetToken = undefined;
    user.userPasswordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) get user with hashed token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) if token is not expired there is user set new password
  if (!user) {
    return next(new AppError("token invalid or expired.", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // 3) update changePassword property for user

  // 4) log the user in and send jwt
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");
  // 2) check if  posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("your current password is wrong!", 401));
  }
  // 3) if so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // 4) log user in , send jwt
  createSendToken(user, 200, res);
});

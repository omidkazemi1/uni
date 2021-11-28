const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const filterObj = (obj, ...allowdFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowdFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUser = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users,
    },
  });
});
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "failed",
    message: "this route is not defined",
  });
};
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. please user /updateMyPassword.",
        400
      )
    );
  }
  // 2) filter req.body
  const filteredBody = filterObj(req.body, "name", "email");
  // 3) update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});
exports.getUser = (req, res) => {
  res.status(500).json({
    status: "failed",
    message: "this route is not defined",
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "failed",
    message: "this route is not defined",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "failed",
    message: "this route is not defined",
  });
};

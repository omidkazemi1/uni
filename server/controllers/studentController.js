const User = require("../models/userModel");
const Class = require("../models/classModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.classList = catchAsync(async (req, res, next) => {
  const classes = await Class.find({ students: { $in: req.user._id } });

  res.status(200).json({
    status: "success",
    data: {
      classes,
    },
  });
});

exports.studentsList = catchAsync(async (req, res, next) => {
  const students = await User.find({ class: { $in: req.params.id } });

  res.status(200).json({
    status: "success",
    data: {
      students,
    },
  });
});

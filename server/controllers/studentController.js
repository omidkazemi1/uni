const mongoose = require("mongoose");
const User = require("../models/userModel");
const Class = require("../models/classModel");
const Exam = require("../models/examModel");
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

exports.examList = catchAsync(async (req, res, next) => {
  // 1) find user class
  const user = await User.findById(req.user._id).select("+class");
  // 2) find exam related to class
  const exams = await Exam.find().where("class").in(user.class);

  res.status(200).json({
    status: "success",
    data: {
      exams,
    },
  });
});

exports.singleExam = catchAsync(async (req, res, next) => {
  const exam = await Exam.findById(req.params.examId);

  if (!exam) {
    return next(new AppError("cant find exam!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      exam,
    },
  });
});

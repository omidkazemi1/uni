/* eslint-disable no-plusplus */
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Class = require("../models/classModel");
const Exam = require("../models/examModel");
const ExamLog = require("../models/examLogModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const authController = require("./authController");

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
  const students = await User.find({ class: { $in: req.params.classId } });

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
  const exams = await Class.aggregate([
    {
      $match: { _id: { $in: user.class } },
    },
    {
      $lookup: {
        from: "exams",
        localField: "exams",
        foreignField: "_id",
        as: "exams",
      },
    },
    {
      $unwind: { path: "$exams" },
    },
    {
      $project: {
        exam: "$exams",
        class: "$name",
        questionLength: { $size: "$exams.questions" },
      },
    },
    {
      $group: {
        _id: "0",
        exams: {
          $push: {
            name: "$exam.name",
            id: "$exam._id",
            date: "$exam.date",
            score: "$exam.score",
            class: "$class",
            questionLength: "$questionLength",
            duration: "$exam.duration",
          },
        },
      },
    },
  ]);

  const listExams = exams[0].exams;

  res.status(200).json({
    status: "success",
    data: {
      exams: listExams,
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

exports.completeExam = catchAsync(async (req, res, next) => {
  const exam = await Exam.findById(req.body.exam);
  const student = await User.findById(req.user._id);
  let score = 0;
  for (let index = 0; index < exam.questions.length; index++) {
    for (let j = 0; j < req.body.questions.length; j++) {
      if (req.body.questions[j].questionId == exam.questions[index]._id) {
        console.log(req.body.questions[j]);
        console.log(exam.questions[index]);
      }
    }
  }

  //const  = await ExamLog.({
  //  // exam: req.body.exam,
  // });
});

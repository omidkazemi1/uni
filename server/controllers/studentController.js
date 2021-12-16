/* eslint-disable no-plusplus */
const User = require("../models/userModel");
const Class = require("../models/classModel");
const Exam = require("../models/examModel");
const ExamLog = require("../models/examLogModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const findClass = (classesExam, classStudent) => {
  const classArray = classesExam.concat(classStudent);
  const toFindDuplicates = (arry) =>
    arry.filter((item, index) => arry.indexOf(item) !== index);
  const duplicateElementa = toFindDuplicates(classArray);
  return duplicateElementa[0];
};

exports.classList = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+class");

  const classes = await Class.aggregate([
    { $match: { _id: { $in: user.class } } },
    {
      $lookup: {
        from: "users",
        localField: "teacher",
        foreignField: "_id",
        as: "teacherDoc",
      },
    },
    {
      $unwind: {
        path: "$teacherDoc",
      },
    },
    {
      $project: {
        name: "$name",
        grade: "$grade",
        numberOfStudent: { $size: "$students" },
        teacher: "$teacherDoc.fullName",
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      classes,
    },
  });
});

exports.studentsList = catchAsync(async (req, res, next) => {
  const students = await User.find({
    class: { $in: req.params.classId },
  }).select("fullName");

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
            startTime: "$exam.startTime",
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

  for (let index = 0; index < listExams.length; index++) {
    const examLog = await ExamLog.findOne({
      exam: listExams[index].id,
      student: req.user._id,
    });

    listExams[index].completed = examLog ? true : false;
  }

  res.status(200).json({
    status: "success",
    data: {
      exams: listExams,
    },
  });
});

exports.singleExam = catchAsync(async (req, res, next) => {
  let exam = await ExamLog.findOne({
    exam: req.params.examId,
    student: req.user._id,
  });

  if (!exam) {
    exam = await Exam.findById(req.params.examId);

    if (!exam) {
      return next(new AppError("cant find exam!", 404));
    }
  }

  res.status(200).json({
    status: "success",
    data: {
      exam,
    },
  });
});

exports.completeExam = catchAsync(async (req, res, next) => {
  // 1) find examlog is exist
  const oldExamLog = await ExamLog.findOne({
    exam: req.body.exam,
    student: req.user._id,
  });

  if (oldExamLog) {
    return next(new AppError("You have already taken the exam", 403));
  }

  // 2) find exam with questions
  const exam = await Exam.findById(req.body.exam).select(
    "+questions.trueOption"
  );

  // 3) find student
  const student = await User.findById(req.user._id).select("+class");
  // 4) initialize variable
  const questions = [];
  let score = 0;
  // 5) iteration questions for questions
  for (let index = 0; index < exam.questions.length; index++) {
    let status = false;
    for (let j = 0; j < req.body.questions.length; j++) {
      if (req.body.questions[j].question == exam.questions[index]._id) {
        if (
          req.body.questions[j].selectedOption ==
          exam.questions[index].trueOption
        ) {
          const question = {
            body: exam.questions[index].body,
            answer1: exam.questions[index].answer1,
            answer2: exam.questions[index].answer2,
            answer3: exam.questions[index].answer3,
            answer4: exam.questions[index].answer4,
            trueOption: exam.questions[index].trueOption,
            score: exam.questions[index].score,
            selectedOption: req.body.questions[j].selectedOption,
          };

          questions.push(question);
          score += exam.questions[index].score;
          status = true;
        } else {
          const question = {
            body: exam.questions[index].body,
            answer1: exam.questions[index].answer1,
            answer2: exam.questions[index].answer2,
            answer3: exam.questions[index].answer3,
            answer4: exam.questions[index].answer4,
            trueOption: exam.questions[index].trueOption,
            score: exam.questions[index].score,
            selectedOption: req.body.questions[j].selectedOption,
          };
          questions.push(question);
          status = true;
        }
      }
    }

    if (!status) {
      const question = {
        body: exam.questions[index].body,
        answer1: exam.questions[index].answer1,
        answer2: exam.questions[index].answer2,
        answer3: exam.questions[index].answer3,
        answer4: exam.questions[index].answer4,
        trueOption: exam.questions[index].trueOption,
        score: exam.questions[index].score,
        selectedOption: null,
      };
      questions.push(question);
    }
  }
  // 5) find class
  const classId = findClass(exam.class, student.class);

  // 6) add ExamLog
  const newExamLog = await ExamLog.create({
    exam: req.body.exam,
    student: req.user._id,
    answers: questions,
    class: classId,
    score,
  });

  // 7) response
  res.status(200).json({
    status: "success",
    data: {
      score,
    },
  });
});

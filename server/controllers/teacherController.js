/* eslint-disable no-await-in-loop */
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Class = require("../models/classModel");
const Exam = require("../models/examModel");
const ExamLog = require("../models/examLogModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

const filterObj = (obj, ...allowdFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowdFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

const findStudentInClass = (classList, student) => {
  for (let index = 0; index < classList.length; index++) {
    if (classList[index].toString() === student.toString()) {
      return true;
    }
  }

  return false;
};

const removeStudentFromClass = (studentList, student) => {
  for (let index = 0; index < studentList.length; index++) {
    if (studentList[index].toString() === student.toString()) {
      studentList.splice(index, 1);
    }
  }
  return studentList;
};

const removeClassFromStudent = (classList, classId) => {
  for (let index = 0; index < classList.length; index++) {
    if (classList[index].toString() === classId.toString()) {
      classList.splice(index, 1);
    }
  }
  return classList;
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

exports.updateMe = catchAsync(async (req, res, next) => {
  const { firstName, lastName } = req.body;

  // 0) check firstName and lastName
  if (!firstName || !lastName) {
    return next(new AppError("please give firstName and lastName", 400));
  }

  if (!firstName.trim() || !lastName.trim()) {
    return next(new AppError("please give firstName and lastName", 400));
  }

  const fullName = `${firstName} ${lastName}`;
  // 2) filter req.body
  const filteredBody = filterObj(
    { fullName, ...req.body },
    "firstName",
    "lastName",
    "fullName"
  );
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

exports.showMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
});

exports.addStudent = catchAsync(async (req, res, next) => {
  const { classId } = req.body;

  const classDoc = await Class.findById(classId);

  if (!classDoc) {
    return next(new AppError("the id belonging to class does not exist", 401));
  }

  const { phoneNumber, nationalCode } = req.body;

  let student = await User.findOne({
    phoneNumber,
    nationalCode,
    role: "student",
  }).select("+class");

  if (!student) {
    student = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber,
      class: [classDoc._id],
      nationalCode,
      role: "student",
    });
  } else {
    const status = findStudentInClass(classDoc.students, student._id);
    if (status) {
      return next(new AppError("this student already added in class", 403));
    }

    await User.updateOne(
      { _id: student._id },
      { $push: { class: classDoc._id } }
    );
  }

  classDoc.students.push(student._id);
  await classDoc.save();

  res.status(201).json({
    status: "success",
    data: student,
  });
});

exports.removeStudent = catchAsync(async (req, res, next) => {
  // 1) get classId and studentId in params
  const { classId, studentId } = req.params;

  // 2) find class by id
  const classDoc = await Class.findById(classId);

  // 3) error if class doesnt exist
  if (!classDoc) {
    return next(new AppError("the id belonging to class does not exist", 401));
  }

  // 4) find student by id
  const student = await User.findById(studentId).select("+class");

  // 5) error if student doesnt exist
  if (!student) {
    return next(
      new AppError("the id belonging to student does not exist", 401)
    );
  }

  // 6) remove studentId from studentlist in class
  removeStudentFromClass(classDoc.students, student._id);
  // 7) remove classId from classList in student
  removeClassFromStudent(student.class, classDoc._id);
  // 8) if student doesnt have any class remove student from DB
  if (student.class.length === 0) {
    await User.findByIdAndDelete(student._id);
  } else {
    await student.save();
  }

  // 9) save doc class
  await classDoc.save();

  // 10) response
  res.status(202).json({
    status: "success",
    data: {
      class: classDoc,
    },
  });
});

exports.addClass = catchAsync(async (req, res, next) => {
  const newClass = await Class.create({
    name: req.body.name,
    grade: req.body.grade,
    students: [],
    teacher: req.user._id,
    description: req.body.description,
  });

  res.status(201).json({
    status: "success",
    data: {
      class: newClass,
    },
  });
});

exports.classList = catchAsync(async (req, res, next) => {
  // const classes = await Class.find({ teacher: req.user._id });
  const features = new APIFeatures(
    Class.find({ teacher: req.user._id }),
    req.query
  ).paginate();

  const classes = await features.query;

  res.status(200).json({
    status: "success",
    data: {
      classes,
    },
  });
});

exports.studentList = catchAsync(async (req, res, next) => {
  const students = await User.find({ class: { $in: req.params.classId } });
  res.status(200).json({
    status: "success",
    data: {
      students,
    },
  });
});

exports.showClass = catchAsync(async (req, res, next) => {
  const singleClass = await Class.findById(req.params.classId);

  if (!singleClass) {
    return next(new AppError("the id belonging to class does not exist", 401));
  }

  res.status(200).json({
    status: "success",
    data: {
      class: singleClass,
    },
  });
});

exports.deleteClass = catchAsync(async (req, res, next) => {
  await Class.findByIdAndDelete(req.params.classId);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateClass = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "name", "grade", "description");

  const updatedClass = await Class.findByIdAndUpdate(
    req.params.classId,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedClass) {
    return next(new AppError("the class does not exist", 401));
  }

  res.status(200).json({
    status: "success",
    data: {
      class: updatedClass,
    },
  });
});

exports.examList = catchAsync(async (req, res, next) => {
  const exams = await Exam.find({ teacher: req.user._id });

  res.status(200).json({
    status: "success",
    data: {
      exams,
    },
  });
});

exports.addExam = catchAsync(async (req, res, next) => {
  const newExam = await Exam.create({
    name: req.body.name,
    class: req.body.class,
    startTime: req.body.startTime,
    duration: req.body.duration,
    teacher: req.user._id,
    questions: req.body.questions,
  });

  for (let index = 0; index < req.body.class.length; index++) {
    await Class.findByIdAndUpdate(req.body.class[index], {
      $push: { exams: newExam._id },
    });
  }

  res.status(201).json({
    status: "success",
    data: {
      exam: newExam,
    },
  });
});

exports.deleteExam = catchAsync(async (req, res, next) => {
  const exam = await Exam.findById(req.params.examId);
  const timeStamp = new Date(exam.date);
  const nowDate = new Date();

  if (timeStamp < nowDate) {
    return next(
      new AppError("you cant remove exam in or after exam date", 401)
    );
  }

  await exam.remove();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.listStudentExam = catchAsync(async (req, res, next) => {
  // const exam = await Exam.findOne({ _id: req.params.examId });
  const examLogs = await ExamLog.aggregate([
    { $match: { exam: mongoose.Types.ObjectId(req.params.examId) } },
    {
      $lookup: {
        from: "classes",
        localField: "class",
        foreignField: "_id",
        as: "class",
      },
    },
    {
      $unwind: { path: "$class" },
    },
    {
      $lookup: {
        from: "users",
        localField: "student",
        foreignField: "_id",
        as: "student",
      },
    },
    {
      $unwind: { path: "$student" },
    },
    {
      $lookup: {
        from: "exams",
        localField: "exam",
        foreignField: "_id",
        as: "exam",
      },
    },
    {
      $unwind: { path: "$exam" },
    },
    {
      $group: {
        _id: "$class._id",
        className: { $first: "$class.name" },
        students: {
          $push: {
            studentName: "$student.fullName",
            studentId: "$student._id",
            score: "$score",
          },
        },
      },
    },
  ]);

  const exam = await Exam.findById(req.params.examId).select([
    "name",
    "duration",
    "startTime",
  ]);

  res.status(200).json({
    exam,
    examLogs,
  });
});

exports.studentExam = catchAsync(async (req, res, next) => {
  // const examLogs = await ExamLog.findOne({
  //   exam: req.params.examId,
  //   student: req.params.studentId,
  // }).populate(["exam", "student"]);

  const examLogs = await ExamLog.aggregate([
    {
      $match: { exam: mongoose.Types.ObjectId(req.params.examId) },
    },
    {
      $match: { student: mongoose.Types.ObjectId(req.params.studentId) },
    },
    {
      $lookup: {
        from: "exams",
        localField: "exam",
        foreignField: "_id",
        as: "exam",
      },
    },
    {
      $lookup: {
        from: "classes",
        localField: "class",
        foreignField: "_id",
        as: "class",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "student",
        foreignField: "_id",
        as: "student",
      },
    },
    {
      $unwind: {
        path: "$exam",
      },
    },
    {
      $unwind: {
        path: "$student",
      },
    },
    {
      $unwind: {
        path: "$class",
      },
    },
    {
      $project: {
        answers: "$answers",
        score: "$score",
        class: "$class.name",
        student: "$student.fullName",
        exam: "$exam",
      },
    },
  ]);

  if (!examLogs) {
    return next(new AppError("cant find examLog student", 404));
  }

  res.status(200).json({
    examLogs,
  });
});

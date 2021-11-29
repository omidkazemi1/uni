const User = require("../models/userModel");
const Class = require("../models/classModel");
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

exports.addStudent = catchAsync(async (req, res, next) => {
  const newStudent = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    nationalCode: req.body.nationalCode,
    role: "student",
  });
});

exports.addClass = catchAsync(async (req, res, next) => {
  const newClass = await Class.create({
    name: req.body.name,
    grade: req.body.grade,
    students: [],
    teacher: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: {
      class: newClass,
    },
  });
});

exports.classList = catchAsync(async (req, res, next) => {
  const classes = await Class.find({ teacher: req.user._id });

  res.status(200).json({
    status: "success",
    data: {
      classes,
    },
  });
});

exports.showClass = catchAsync(async (req, res, next) => {
  const singleClass = await Class.findById(req.params.id);

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
  await Class.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateClass = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "name", "grade");

  const updatedClass = await Class.findByIdAndUpdate(
    req.params.id,
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
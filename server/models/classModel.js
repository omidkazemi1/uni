const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: [true, "لطفا نام کلاس را وارد کنید"] },
  grade: {
    type: String,
    required: [true, "لطفا پایه تحصیلی کلاس را وارد کنید"],
  },
  students: [
    { type: mongoose.Schema.ObjectId, ref: "Student", required: true },
  ],
  exams: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Exams",
      required: true,
      select: false,
    },
  ],
  teacher: { type: mongoose.Schema.ObjectId, ref: "Teacher", required: true },
  description: String,
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;

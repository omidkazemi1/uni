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
  teacher: { type: mongoose.Schema.ObjectId, ref: "Teacher", required: true },
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;

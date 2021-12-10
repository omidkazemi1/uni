const mongoose = require("mongoose");

const examLogSchema = new mongoose.Schema(
  {
    exam: { type: mongoose.Types.ObjectId, ref: "Exam", required: true },
    class: { type: mongoose.Types.ObjectId, ref: "Class", required: true },
    student: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    answers: [
      {
        question: {
          type: mongoose.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        selectedOption: { type: Number, required: true },
      },
    ],
    score: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("ExamLog", examLogSchema);

const mongoose = require("mongoose");

const examLogSchema = new mongoose.Schema(
  {
    exam: { type: mongoose.Types.ObjectId, ref: "Exam", required: true },
    class: { type: mongoose.Types.ObjectId, ref: "Class", required: true },
    student: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    answers: [
      {
        body: { type: String, required: [true, "لطفا متن سوال را وارد کنید"] },
        answer1: {
          type: String,
          required: [true, "گزینه اول را لطفا وارد کنید"],
        },
        answer2: {
          type: String,
          required: [true, "گزینه دوم را لطفا وارد کنید"],
        },
        answer3: {
          type: String,
          required: [true, "گزینه سوم را لطفا وارد کنید"],
        },
        answer4: {
          type: String,
          required: [true, "گزینه چهارم را لطفا وارد کنید"],
        },
        trueOption: {
          type: String,
          required: [true, "لطفا گزینه درست را انتخاب کنید"],
          select: false,
        },
        score: {
          type: String,
          required: [true, "لطفا بارم سوال را وارد کنید"],
        },
        selectedOption: { type: String, required: true },
      },
    ],
    score: { type: String, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

module.exports = mongoose.model("ExamLog", examLogSchema);

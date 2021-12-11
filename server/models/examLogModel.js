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
          type: Number,
          required: [true, "گزینه اول را لطفا وارد کنید"],
        },
        answer2: {
          type: Number,
          required: [true, "گزینه دوم را لطفا وارد کنید"],
        },
        answer3: {
          type: Number,
          required: [true, "گزینه سوم را لطفا وارد کنید"],
        },
        answer4: {
          type: Number,
          required: [true, "گزینه چهارم را لطفا وارد کنید"],
        },
        trueOption: {
          type: Number,
          required: [true, "لطفا گزینه درست را انتخاب کنید"],
          select: false,
        },
        score: {
          type: Number,
          required: [true, "لطفا بارم سوال را وارد کنید"],
        },
        selectedOption: { type: Number, required: true },
      },
    ],
    score: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

module.exports = mongoose.model("ExamLog", examLogSchema);

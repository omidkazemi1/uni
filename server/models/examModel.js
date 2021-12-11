const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "نام آزمون را لطفا وارد کنید"] },
    teacher: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    class: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Class",
        required: [true, "آزمون نمیتواند بدون کلاس باشد"],
      },
    ],
    questions: [
      {
        body: { type: String, required: [true, "لطفا متن سوال را وارد کنید"] },
        "answer-1": {
          type: String,
          required: [true, "گزینه اول را لطفا وارد کنید"],
        },
        "answer-2": {
          type: String,
          required: [true, "گزینه دوم را لطفا وارد کنید"],
        },
        "answer-3": {
          type: String,
          required: [true, "گزینه سوم را لطفا وارد کنید"],
        },
        "answer-4": {
          type: String,
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
      },
    ],
    date: {
      type: String,
      required: [true, "لطفا تاریخ و زمان امتحان را وارد کنید"],
    },
    expireTime: {
      type: Number,
      required: [true, "لطفا زمان امتحان را وارد کنید "],
    },
    score: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

examSchema.pre("save", async function (next) {
  let score = 0;
  for (let index = 0; index < this.questions.length; index++) {
    score += this.questions[index].score;
  }

  this.score = score;
  next();
});

module.exports = mongoose.model("Exam", examSchema);

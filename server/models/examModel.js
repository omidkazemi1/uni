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
    time: {
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

examSchema.pre("save", async function (next) {
  const date = `${this.date}T${this.time}:00.000Z`;
  this.date = date;
  this.time = undefined;
  next();
});
module.exports = mongoose.model("Exam", examSchema);

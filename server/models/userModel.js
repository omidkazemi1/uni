const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "لطفا نام خود را وارد کنید "],
  },
  lastName: {
    type: String,
    required: [true, "لطفا نام خانوادگی خود را وارد کنید"],
  },
  phoneNumber: {
    type: String,
    select: false,
  },
  nationalCode: {
    type: String,
    select: false,
    required: [true, "لطفا کدملی خود را وارد کنید"],
  },
  role: {
    type: String,
    enum: ["teacher", "student"],
    default: "teacher",
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model("User", userSchema);

module.exports = User;

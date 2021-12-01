const mongoose = require("mongoose");
const { digitsFaToEn } = require("@persian-tools/persian-tools");

const regexPhoneNumber = new RegExp("^(\\+98|0)?9\\d{9}$");
const regexNationalCode = new RegExp("^[0-9]{10}$");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "لطفا نام خود را وارد کنید "],
  },
  lastName: {
    type: String,
    required: [true, "لطفا نام خانوادگی خود را وارد کنید"],
  },
  class: [{ type: mongoose.Schema.ObjectId, ref: "Class" }],
  fullName: String,
  phoneNumber: {
    type: String,
    unique: true,
    validate: {
      validator: function (phoneNumber) {
        return regexPhoneNumber.test(digitsFaToEn(phoneNumber));
      },
      message: "شماره تلفن متبر نیست",
    },
  },
  nationalCode: {
    type: String,
    unique: true,
    required: [true, "لطفا کدملی خود را وارد کنید"],
    validate: {
      validator: function (nationalCode) {
        return regexNationalCode.test(digitsFaToEn(nationalCode));
      },
      message: "کد ملی متبر نیست",
    },
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

// 1) pre find(any) say just active user
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// 2) make fullName feild with firstName and fullName
userSchema.pre("save", async function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});

// 3) convert persian to english phoneNumber and nationalCode
userSchema.pre("save", async function (next) {
  this.phoneNumber = digitsFaToEn(this.phoneNumber);
  this.nationalCode = digitsFaToEn(this.nationalCode);
  next();
});

// 4) remove class array in schema for teacher
userSchema.pre("save", async function (next) {
  if (this.role === "teacher") {
    this.class = undefined;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

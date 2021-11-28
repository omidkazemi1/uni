//$ require
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const app = express();
const morgan = require("morgan");
const AppError = require("./utils/appError");
//$

// $ Routes Modules
const tourRouter = require("./Routes/tours");
const userRouter = require("./Routes/users");
// $

// $ Error Handler
const globalErrorHandler = require("./controllers/errorController");
//

// 1) Global Middleware
// set security http headers
app.use(helmet());
// development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //* morgan is for show state of request in console */
}

// limit request for same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this ip, please try again in hour later!",
});
app.use("/api", limiter);

// body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// data sanitization against no sql injection
app.use(mongoSanitize());
// data sanitization against xss
app.use(xss());
// prevent parameters polution
app.use(hpp());
// serving static files
app.use(express.static(`${__dirname}/public`));

// time middleware (just test :)
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// route
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this Server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;

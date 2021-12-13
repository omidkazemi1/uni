const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const redisHandler = require("./utils/redis");

// 1) start redis
redisHandler.setRedis();
const app = require("./app");

// 2) connect to database
// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((connection) => console.log("connect to mongoose"));

// 3) listen on port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is runnig in port: ${port}`);
});

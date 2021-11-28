const dotenv = require('dotenv')
const mongoose = require('mongoose');
const fs = require('fs');
dotenv.config({ path: './config.env' })
const Tour = require('./../../models/tourModel');

// $ connect to database 
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(connection => console.log('connect to mongoose'))
//$ 

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('succefly loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit()
}

const removeData = async () => {
  try {
    await Tour.deleteMany()
    console.log('succfly remove!');
  } catch (err) {
    console.log(err);
  }
  process.exit()
}  

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--remove') {
  removeData()
}

console.log(process.argv);
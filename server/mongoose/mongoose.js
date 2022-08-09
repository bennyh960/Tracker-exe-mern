const mongoose = require("mongoose");
const chalk = require("chalk");

const uri = process.env.ATLS_URI;

mongoose
  .connect(process.env.NODE_ENV === "production" ? uri : "mongodb://127.0.0.1:27017/trackerDev", {
    autoIndex: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(chalk.green.inverse("Mongoose connect"));
  })
  .catch((e) => {
    console.log(chalk.red.inverse("Mongoose connection faild"));
    console.log(chalk.red.inverse(e));
  });

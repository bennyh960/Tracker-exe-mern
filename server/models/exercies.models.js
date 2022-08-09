const mongoose = require("mongoose");
const { number } = require("yargs");

const exerciseSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, uppercase: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Exercies = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercies;

const router = require("express").Router();
const Exercise = require("../models/exercies.models");

router.route("/").get(async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.send(exercises);
  } catch (error) {
    res.status(400).send(`error: ${error.message}`);
  }
});

router.route("/add").post(async (req, res) => {
  try {
    const exerciseFromBody = { ...req.body, duration: Number(req.body.duration), date: Date.parse(req.body.date) };
    const exercies = new Exercise(exerciseFromBody);
    exercies.save();
    res.send(exercies);
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.send(exercise);
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    res.send(exercise ? "deleted" : "exercise not found");
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});

router.route("/update/:id").patch(async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body);
    exercise.save();
    res.send(exercise);
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});

module.exports = router;

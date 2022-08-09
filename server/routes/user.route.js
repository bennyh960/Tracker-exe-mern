const express = require("express");
const User = require("../models/user.models");
const router = new express.Router();

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(`error:${err}`));
});

router.route("/newUser").post(async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route("/delete").delete(async (req, res) => {
  try {
    // const user = await User.findByIdAndRemove(req.body);
    // console.log(req.body);
    const user = await User.findByIdAndRemove(req.body.id);

    res.send(user ? "deleted" : "user not found");
  } catch (error) {
    res.status(500).send("error with delete" + error);
  }
});

module.exports = router;

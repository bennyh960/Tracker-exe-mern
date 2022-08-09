const express = require("express");
const cors = require("cors");
const userRouter = require("./server/routes/user.route");
const exerciseRouter = require("./server/routes/exerices.route");
require("./server/mongoose/mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});

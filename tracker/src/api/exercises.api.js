import axios from "axios";

const url = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

const exercisesRouter = axios.create({
  baseURL: url + "/exercises",
});

export default exercisesRouter;

import axios from "axios";

const url = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

const usersRouter = axios.create({
  baseURL: url + "/users",
});

export default usersRouter;

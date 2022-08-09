import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import usersRouter from "../../../api/users.api";
import "./createExercise.css";
import Spiner1 from "../../spiners/spiner1/spiner";
import exercisesRouter from "../../../api/exercises.api";

export default function CreateExercise() {
  const [users, setUsers] = useState([]);
  const [spinerOn, setSpiner] = useState(false);
  const [excericse, setExcercise] = useState({ userName: "", description: "", duration: 0, date: new Date() });
  let navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await usersRouter.get("/");
      // console.log(data);
      setUsers(data.map((user) => user.userName));
    };
    getUsers();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(excericse);
    for (const key in excericse) {
      if (!excericse[key]) return;
    }

    setSpiner(true);
    try {
      await exercisesRouter.post("/add", excericse);
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      setSpiner(false);
    }
  };

  const onChange = ({ target: { value, id } }) => {
    console.log(value, id);
    setExcercise((p) => {
      return { ...p, [id]: value };
    });
  };

  return (
    <div>
      <h3>Create New Excercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <select
            // useref={"userInput"}
            name=""
            id="userName"
            required
            className="form-control"
            value={excericse.userName}
            onChange={onChange}
          >
            {users.map((user) => {
              return (
                <option value={user} key={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            required
            className="form-control"
            id="description"
            value={excericse.description}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes):</label>
          <input
            type="text"
            required
            className="form-control"
            id="duration"
            value={excericse.duration}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <DatePicker
            selected={excericse.date}
            id="date"
            onChange={(date: Date) =>
              setExcercise((p) => {
                return { ...p, date };
              })
            }
          />
        </div>
        <div className="form-group">
          {/* <input type="submit" value={"Create Excersie Log"} className="btn btn-primary my-btn" /> */}
          <button className="btn btn-primary my-btn">{spinerOn ? <Spiner1 /> : "Create Excersie Log"}</button>
        </div>
      </form>
    </div>
  );
}

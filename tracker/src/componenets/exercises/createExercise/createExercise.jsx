import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./createExercise.css";

export default function CreateExercise() {
  const [users, setUsers] = useState(["x", "y", "z"]);
  const [excericse, setExcercise] = useState({ userName: "", description: "", duration: 0, date: new Date() });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(excericse);
    // window.location = "/";
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
          <input type="submit" value={"Create Excersie Log"} className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

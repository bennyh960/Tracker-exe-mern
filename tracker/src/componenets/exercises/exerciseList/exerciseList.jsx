import React from "react";
import "./excersieList.css";
import exercisesRouter from "../../../api/exercises.api";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Spiner2 from "../../spiners/spiner1/spinner2";

export default function ExerciseList() {
  const [exerciesList, setExerciesList] = useState([]);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    const getExerciese = async () => {
      setLoader(true);
      try {
        const { data } = await exercisesRouter.get("");
        setExerciesList(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      setLoader(false);
    };
    getExerciese();
  }, []);

  const deleteExercise = async (id) => {
    try {
      setLoader(true);
      await exercisesRouter.delete("/delete/" + id);
      setLoader(false);
      // update ui
      setExerciesList((prev) => prev.filter((exe) => exe._id != id));
    } catch (error) {
      console.log(error);
    }
  };

  const drawExcerise = () => {
    return exerciesList.map((exe) => {
      return <Exercises key={exe._id} exercise={exe} deleteExercise={deleteExercise} />;
    });
  };
  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* <tbody>{["x", "y", "z", "w"]}</tbody> */}
        <tbody>{isLoading ? <Spiner2 /> : drawExcerise()}</tbody>
      </table>
    </div>
  );
}

function Exercises({ exercise, deleteExercise }) {
  return (
    <tr>
      <td>{exercise.userName}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date.toString(0, 10)}</td>
      <td>
        <Link to={"/edit/" + exercise._id}>Edit</Link> |{" "}
        <a href="#" onClick={() => deleteExercise(exercise._id)}>
          Delete
        </a>
      </td>
    </tr>
  );
}

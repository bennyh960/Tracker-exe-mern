import "./EditExercise.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import usersRouter from "../../../api/users.api";
import Spiner1 from "../../spiners/spiner1/spiner";
import exercisesRouter from "../../../api/exercises.api";

export default function EditExercise() {
  const [user, setUser] = useState("");
  const [spinerOn, setSpiner] = useState(false);
  const [excericse, setExcercise] = useState({ userName: "", description: "", duration: 0, date: new Date() });
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await exercisesRouter.get("/" + id);
      console.log(data);
      setUser(data.userName);
      setExcercise({
        userName: data.userName,
        description: data.description,
        duration: data.duration,
        date: new Date(data.date),
      });
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
      await exercisesRouter.patch("/update/" + id, excericse);
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
          <input name="" id="userName" required className="form-control" defaultValue={user} disabled />
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
          <button className="btn btn-secondary my-btn">{spinerOn ? <Spiner1 /> : "Update Excersie Log"}</button>
        </div>
      </form>
    </div>
  );
}

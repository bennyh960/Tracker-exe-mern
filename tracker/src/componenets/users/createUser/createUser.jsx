import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userRouter from "../../../api/users.api";
import Spiner1 from "../../spiners/spiner1/spiner";
import "./createUser.css";

export default function CreateUser() {
  const [user, setUser] = useState("");
  const [spinerOn, setSpiner] = useState(false);
  const [btnText, setBtnText] = useState("Create New User");
  const navigate = useNavigate();
  const onChange = ({ target: { value } }) => {
    setUser(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    if (user) {
      setSpiner(true);
      try {
        const { data } = await userRouter.post("/newUser", { userName: user });
        console.log(data);
        setTimeout(() => {
          navigate("/");
        }, 500);
      } catch (error) {
        setSpiner(false);
        user.length >= 3 ? setBtnText(`${user} is already taken`) : setBtnText(`Username min size is 3 characters`);
        setTimeout(() => {
          setBtnText("Create New User");
        }, 2000);
      }
    }
  };
  return (
    <div>
      <h3>Create New Excercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" required className="form-control" id="username" value={user} onChange={onChange} />
        </div>

        <div className="form-group">
          <button className="btn btn-secondary my-btn">{spinerOn ? <Spiner1 /> : btnText}</button>
        </div>
      </form>
      {/* <Spiner1 /> */}
    </div>
  );
}

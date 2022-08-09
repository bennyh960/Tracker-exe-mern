// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditExercise from "./componenets/exercises/editExercise/editExercise";
import ExerciseList from "./componenets/exercises/exerciseList/exerciseList";
import CreateExercise from "./componenets/exercises/createExercise/createExercise";
import CreateUser from "./componenets/users/createUser/createUser";
import Navbar from "./componenets/navbar/navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<ExerciseList />} />
          <Route path="/edit/:id" element={<EditExercise />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useState } from "react";
import HandleRefresh from "./HandleRefresh";

function App() {
  const [isAuthenticated, setIsAuthenticated]=useState(false);

  const PrivateRoute=({element})=>{
    return isAuthenticated ? element : <Navigate to="/login"></Navigate>

  }

  return (
    <div className="App">
    <HandleRefresh setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />}/>} />
      </Routes>
    </div>
  );
}

export default App;

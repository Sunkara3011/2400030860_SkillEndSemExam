import React from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Professional from "./pages/Professional";
import User from "./pages/User";
import Support from "./pages/Support";
import { logoutUser } from "./redux/authSlice";

function Navbar() {
  const currentUser = useSelector(s => s.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="navbar">
      <div style={{display:"flex", gap:15, alignItems:"center"}}>
        <h2 style={{margin:0}}>SkillConnect</h2>
        <Link to="/">Home</Link>
        <Link to="/support">Support</Link>
      </div>

      <div style={{display:"flex", gap:12, alignItems:"center"}}>
        {!currentUser && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {currentUser && (
          <>
            {currentUser.role === "admin" && <Link to="/admin">Admin</Link>}
            {currentUser.role === "professional" && <Link to="/professional">Professional</Link>}
            {currentUser.role === "user" && <Link to="/user">User</Link>}
            <span style={{marginLeft:8}}>Hi, {currentUser.name}</span>
            <button onClick={handleLogout} style={{background:"#e74c3c"}}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/professional" element={<Professional/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/support" element={<Support/>} />
      </Routes>
    </BrowserRouter>
  );
}

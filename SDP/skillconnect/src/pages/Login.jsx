import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.auth.users);
  const navigate = useNavigate();

  const [details, setDetails] = useState({email:"", password:""});
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const found = users.find(
      u => u.email === details.email && u.password === details.password
    );

    if(!found) {
      setError("Invalid Credentials!");
      return;
    }

    dispatch(loginUser(found));

    if(found.role === "admin") navigate("/admin");
    if(found.role === "professional") navigate("/professional");
    if(found.role === "user") navigate("/user");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={(e)=>setDetails({...details,email:e.target.value})} />
          <input type="password" placeholder="Password" onChange={(e)=>setDetails({...details,password:e.target.value})} />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

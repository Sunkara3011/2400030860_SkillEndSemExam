 import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({name:"", email:"", password:"", role:""});
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!form.name || !form.email || !form.password || !form.role) {
      setError("All fields are required");
      return;
    }

    dispatch(registerUser(form));
    alert("Registration Successful!");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Account</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} />
          <input type="email" placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} />
          <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})} />

          <select onChange={(e)=>setForm({...form, role:e.target.value})}>
            <option>Select Role</option>
            <option value="admin">Admin</option>
            <option value="professional">Professional</option>
            <option value="user">User</option>
          </select>

          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

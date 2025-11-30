import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <div className="card" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div>
          <h1>SkillConnect</h1>
          <p>Find and hire professionals from your neighborhood. Admin, Professionals, Users & Customer Support included.</p>
          <div style={{display:"flex", gap:8}}>
            <Link to="/register"><button>Register</button></Link>
            <Link to="/login"><button style={{background:"#777"}}>Login</button></Link>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8a1d6a330bacb2b78f88f9c7e7defb01" alt="professionals" style={{width:260, borderRadius:10}}/>
      </div>
      <div className="card">
        <h3>How it works</h3>
        <ol>
          <li>Register as user or professional.</li>
          <li>Professionals add services (CRUD).</li>
          <li>Users search, view and hire professionals.</li>
          <li>Admin manages platform and users.</li>
        </ol>
      </div>
    </div>
  );
}

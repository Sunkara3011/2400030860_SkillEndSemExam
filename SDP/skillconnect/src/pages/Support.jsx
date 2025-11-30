import React, { useState } from "react";

export default function Support() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const validate = () => {
    if (!form.name || !form.email || !form.message) {
      setStatus("Please fill all fields.");
      return false;
    }
    if (!form.email.includes("@")) { setStatus("Enter a valid email."); return false; }
    return true;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // For demo: persist to localStorage
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push({ id: Date.now().toString(), ...form, date: new Date().toISOString() });
    localStorage.setItem("tickets", JSON.stringify(tickets));
    setStatus("Support request submitted. We'll contact you at " + form.email);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container">
      <h2>Customer Support</h2>
      <div className="card">
        <form onSubmit={submit} style={{maxWidth:600}}>
          <input placeholder="Your name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
          <input placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
          <textarea placeholder="How can we help?" rows={6} value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} />
          <button type="submit">Send</button>
        </form>
        {status && <div style={{marginTop:10}} className={status.startsWith("Support") ? "success" : "error"}>{status}</div>}
      </div>
    </div>
  );
}

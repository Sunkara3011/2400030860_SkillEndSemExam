import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ServiceCard from "../components/ServiceCard";
import { api } from "../api/mockApi";

export default function User() {
  const services = useSelector((s) => s.services.list);
  const currentUser = useSelector((s) => s.auth.currentUser);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(services);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFiltered(services);
  }, [services]);

  const doSearch = (q) => {
    const val = q.trim().toLowerCase();
    if (!val) return setFiltered(services);
    const res = services.filter(s =>
      s.title.toLowerCase().includes(val) ||
      s.description.toLowerCase().includes(val) ||
      s.category.toLowerCase().includes(val)
    );
    setFiltered(res);
  };

  useEffect(() => {
    doSearch(query);
  }, [query, services]);

  const handleHire = (service) => {
    if (!currentUser) {
      alert("Please login to hire.");
      return;
    }
    const hires = JSON.parse(localStorage.getItem("hires")) || [];
    hires.push({
      id: Date.now().toString(),
      serviceId: service.id,
      serviceTitle: service.title,
      userEmail: currentUser.email,
      professionalEmail: service.ownerEmail,
      date: new Date().toISOString(),
    });
    localStorage.setItem("hires", JSON.stringify(hires));
    setMessage(`You hired "${service.title}". Contact: ${service.ownerEmail}`);
  };

  return (
    <div className="container">
      <h2>Find Professionals</h2>
      <div style={{display:"flex", gap:10, alignItems:"center"}}>
        <input placeholder="Search by title, category, or description" value={query} onChange={(e)=>setQuery(e.target.value)} />
        <button onClick={() => doSearch(query)}>Search</button>
      </div>

      {message && <div className="success">{message}</div>}

      <div style={{marginTop:20}}>
        {filtered.length === 0 && <div className="card">No professionals found.</div>}
        {filtered.map(s => (
          <ServiceCard key={s.id} s={s} onHire={handleHire} onEdit={()=>{}} onDelete={()=>{}} showHire={true} />
        ))}
      </div>

      <h3 style={{marginTop:30}}>Your Hires</h3>
      <div className="card">
        {(() => {
          const all = JSON.parse(localStorage.getItem("hires")) || [];
          const mine = all.filter(h => h.userEmail === (currentUser?.email || ""));
          if (!currentUser) return <div>Please login to see your hires.</div>;
          if (mine.length === 0) return <div>No hires yet.</div>;
          return (
            <ul>
              {mine.map(h => <li key={h.id}>{h.serviceTitle} — hired on {new Date(h.date).toLocaleString()}</li>)}
            </ul>
          );
        })()}
      </div>
    </div>
  );
}

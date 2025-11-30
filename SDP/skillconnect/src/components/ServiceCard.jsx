import React from "react";

export default function ServiceCard({ s, onEdit, onDelete, onHire, showHire=true }) {
  return (
    <div className="card" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <div style={{flex:1}}>
        <h3 style={{margin:"0 0 6px"}}>{s.title}</h3>
        <p style={{margin:"0 0 6px", color:"#555"}}>{s.description}</p>
        <small style={{color:"#777"}}>Category: {s.category} • Price: ₹{s.price}</small>
      </div>

      <div style={{display:"flex", flexDirection:"column", gap:8, marginLeft:16}}>
        {showHire && <button onClick={() => onHire(s)} style={{minWidth:100}}>Hire</button>}
        <button onClick={() => onEdit(s)} style={{minWidth:100, background:"#ffb74d"}}>Edit</button>
        <button onClick={() => onDelete(s.id)} style={{minWidth:100, background:"#e57373"}}>Delete</button>
      </div>
    </div>
  );
}

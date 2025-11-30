import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../api/mockApi";
import { addService, updateService, deleteService } from "../redux/serviceSlice";
import ServiceForm from "../components/ServiceForm";
import ServiceCard from "../components/ServiceCard";

export default function Admin() {
  const services = useSelector((s) => s.services.list);
  const users = useSelector((s) => s.auth.users);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // initial fetch (simulate)
    setLoading(true);
    api.fetchServices().then((res) => {
      // replace local store if mismatch
      // but keep using Redux for UI — simply ensure localStorage is authoritative
      setLoading(false);
    });
  }, []);

  const handleAdd = async (payload) => {
    setLoading(true);
    await api.createService(payload);
    dispatch(addService(payload));
    setLoading(false);
    setMessage("Service added.");
    setShowForm(false);
  };

  const handleUpdate = async (payload) => {
    setLoading(true);
    await api.updateService(payload);
    dispatch(updateService(payload));
    setLoading(false);
    setMessage("Service updated.");
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;
    setLoading(true);
    await api.deleteService(id);
    dispatch(deleteService(id));
    setLoading(false);
    setMessage("Service removed.");
  };

  return (
    <div className="container">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2>Admin Dashboard</h2>
        <div>
          <button onClick={() => { setShowForm(!showForm); setEditing(null); }}>
            {showForm ? "Hide Form" : "Add Service"}
          </button>
        </div>
      </div>

      {message && <div className="success">{message}</div>}
      {loading && <div className="card">Loading...</div>}

      {showForm && (
        <ServiceForm
          initial={editing}
          onSubmit={editing ? handleUpdate : handleAdd}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      <h3>All Services</h3>
      {services.length === 0 && <div className="card">No services yet.</div>}
      {services.map((s) => (
        <ServiceCard
          key={s.id}
          s={s}
          onEdit={(svc) => { setEditing(svc); setShowForm(true); }}
          onDelete={(id) => handleDelete(id)}
          showHire={false}
        />
      ))}

      <h3 style={{marginTop:30}}>Registered Users</h3>
      <div className="card">
        {users.length === 0 ? <div>No users</div> : (
          <table style={{width:"100%", borderCollapse:"collapse"}}>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.email}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

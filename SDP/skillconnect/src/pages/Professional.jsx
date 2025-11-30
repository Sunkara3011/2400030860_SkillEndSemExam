import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ServiceForm from "../components/ServiceForm";
import ServiceCard from "../components/ServiceCard";
import { addService, updateService, deleteService } from "../redux/serviceSlice";
import { api } from "../api/mockApi";

export default function Professional() {
  const currentUser = useSelector((s) => s.auth.currentUser);
  const services = useSelector((s) => s.services.list);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // nothing extra; data is in store/localStorage
  }, []);

  const handleAdd = async (payload) => {
    payload.ownerEmail = currentUser.email;
    setLoading(true);
    await api.createService(payload);
    dispatch(addService(payload));
    setLoading(false);
    setShowForm(false);
    setMessage("Service created.");
  };

  const handleUpdate = async (payload) => {
    setLoading(true);
    await api.updateService(payload);
    dispatch(updateService(payload));
    setLoading(false);
    setEditing(null);
    setShowForm(false);
    setMessage("Service updated.");
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;
    setLoading(true);
    await api.deleteService(id);
    dispatch(deleteService(id));
    setLoading(false);
    setMessage("Deleted.");
  };

  const myServices = services.filter((s) => s.ownerEmail === currentUser?.email);

  return (
    <div className="container">
      <h2>Professional Dashboard</h2>
      {currentUser && <div className="card">Welcome, <b>{currentUser.name}</b> ({currentUser.email})</div>}

      <div style={{display:"flex", justifyContent:"flex-end", marginBottom:10}}>
        <button onClick={() => { setShowForm(!showForm); setEditing(null); }}>
          {showForm ? "Close" : "Add Service"}
        </button>
      </div>

      {message && <div className="success">{message}</div>}
      {loading && <div className="card">Processing...</div>}

      {showForm && (
        <ServiceForm
          initial={editing}
          onSubmit={editing ? handleUpdate : handleAdd}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      <h3>My Services</h3>
      {myServices.length === 0 && <div className="card">You don't have services yet.</div>}
      {myServices.map((s) => (
        <ServiceCard
          key={s.id}
          s={s}
          onEdit={(svc) => { setEditing(svc); setShowForm(true); }}
          onDelete={(id) => handleDelete(id)}
          showHire={false}
        />
      ))}
    </div>
  );
}

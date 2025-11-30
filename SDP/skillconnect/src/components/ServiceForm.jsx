import React, { useState, useEffect } from "react";

export default function ServiceForm({ initial = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    id: initial?.id || Date.now().toString(),
    title: initial?.title || "",
    description: initial?.description || "",
    price: initial?.price || "",
    category: initial?.category || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({
      id: initial?.id || Date.now().toString(),
      title: initial?.title || "",
      description: initial?.description || "",
      price: initial?.price || "",
      category: initial?.category || "",
    });
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.description.trim()) e.description = "Description is required.";
    if (!form.category.trim()) e.category = "Category is required.";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Enter a valid positive price.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, price: Number(form.price) });
  };

  return (
    <form className="card" onSubmit={submit} style={{maxWidth:600}}>
      <h3>{initial ? "Edit Service" : "Add Service"}</h3>

      <label>Title</label>
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="e.g., Plumbing - Fix leak"
      />
      {errors.title && <div className="error">{errors.title}</div>}

      <label>Description</label>
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Describe the service..."
        rows={4}
      />
      {errors.description && <div className="error">{errors.description}</div>}

      <label>Category</label>
      <input
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        placeholder="e.g., Home Repair"
      />
      {errors.category && <div className="error">{errors.category}</div>}

      <label>Price (INR)</label>
      <input
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        placeholder="e.g., 500"
      />
      {errors.price && <div className="error">{errors.price}</div>}

      <div style={{display:"flex", gap:10, marginTop:10}}>
        <button type="submit">Save</button>
        <button type="button" style={{background:"#777"}} onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

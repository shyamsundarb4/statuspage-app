import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function EditIncidentModal({ incident, onClose, onUpdated }) {
  const { getAccessTokenSilently } = useAuth0();
  const [title, setTitle] = useState(incident.title);
  const [status, setStatus] = useState(incident.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    await fetch(`/api/incidents/${incident.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, status }),
    });
    onUpdated();
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h3>Edit Incident</h3>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="OPEN">Open</option>
          <option value="INVESTIGATING">Investigating</option>
          <option value="RESOLVED">Resolved</option>
        </select>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

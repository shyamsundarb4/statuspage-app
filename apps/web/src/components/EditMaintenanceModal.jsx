import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function EditMaintenanceModal({ maintenance, onClose, onUpdated }) {
  const { getAccessTokenSilently } = useAuth0();
  const [title, setTitle] = useState(maintenance.title);
  const [status, setStatus] = useState(maintenance.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    await fetch(`/api/maintenances/${maintenance.id}`, {
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
        <h3>Edit Maintenance</h3>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="SCHEDULED">Scheduled</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

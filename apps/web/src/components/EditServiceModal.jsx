import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function EditServiceModal({ service, onClose, onUpdated }) {
  const { getAccessTokenSilently } = useAuth0();
  const [name, setName] = useState(service.name);
  const [status, setStatus] = useState(service.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    await fetch(`/api/services/${service.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, status }),
    });
    onUpdated();
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h3>Edit Service</h3>
        <input value={name} onChange={e => setName(e.target.value)} required />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="OPERATIONAL">Operational</option>
          <option value="DEGRADED">Degraded</option>
          <option value="OUTAGE">Outage</option>
        </select>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

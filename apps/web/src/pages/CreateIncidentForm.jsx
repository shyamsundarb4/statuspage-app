import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createIncident } from "../api";

export default function CreateIncidentForm({ organizationId, serviceId }) {
  const { getAccessTokenSilently } = useAuth0();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("OPEN");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      await createIncident({ title, status, serviceId, organizationId }, token);
      setMessage("Incident created!");
      setTitle("");
      setStatus("OPEN");
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Incident</h3>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="OPEN">Open</option>
        <option value="RESOLVED">Resolved</option>
        <option value="SCHEDULED">Scheduled</option>
      </select>
      <button type="submit">Create</button>
      {message && <p>{message}</p>}
    </form>
  );
}

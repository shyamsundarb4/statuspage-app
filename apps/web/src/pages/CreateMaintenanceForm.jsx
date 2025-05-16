import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createMaintenance } from "../api";

export default function CreateMaintenanceForm({ serviceId }) {
  const { getAccessTokenSilently } = useAuth0();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("SCHEDULED");
  const [scheduledStart, setScheduledStart] = useState("");
  const [scheduledEnd, setScheduledEnd] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      await createMaintenance({ title, description, status, serviceId, scheduledStart, scheduledEnd }, token);
      setMessage("Maintenance created!");
      setTitle("");
      setDescription("");
      setStatus("SCHEDULED");
      setScheduledStart("");
      setScheduledEnd("");
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Schedule Maintenance</h3>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="SCHEDULED">Scheduled</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      <input type="datetime-local" value={scheduledStart} onChange={e => setScheduledStart(e.target.value)} required />
      <input type="datetime-local" value={scheduledEnd} onChange={e => setScheduledEnd(e.target.value)} required />
      <button type="submit">Create</button>
      {message && <p>{message}</p>}
    </form>
  );
}

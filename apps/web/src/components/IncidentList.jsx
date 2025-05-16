import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function IncidentList({ serviceId, onEdit, refreshKey }) {
  const { getAccessTokenSilently } = useAuth0();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serviceId) return;
    (async () => {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const res = await fetch(`/api/services/${serviceId}/incidents`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setIncidents(data);
      setLoading(false);
    })();
  }, [serviceId, getAccessTokenSilently, refreshKey]);

  const handleDelete = async (incidentId) => {
    if (!window.confirm("Delete this incident?")) return;
    const token = await getAccessTokenSilently();
    await fetch(`/api/incidents/${incidentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setIncidents(incidents.filter(i => i.id !== incidentId));
  };

  if (loading) return <div>Loading incidents...</div>;
  if (!incidents.length) return <div>No incidents found.</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {incidents.map(incident => (
          <tr key={incident.id}>
            <td>{incident.title}</td>
            <td>{incident.status}</td>
            <td>
              <button onClick={() => onEdit(incident)}>Edit</button>
            </td>
            <td>
              <button onClick={() => handleDelete(incident.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

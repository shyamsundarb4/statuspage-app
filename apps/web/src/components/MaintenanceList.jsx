import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function MaintenanceList({ serviceId, onEdit, refreshKey }) {
  const { getAccessTokenSilently } = useAuth0();
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serviceId) return;
    (async () => {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const res = await fetch(`/api/services/${serviceId}/maintenances`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMaintenances(data);
      setLoading(false);
    })();
  }, [serviceId, getAccessTokenSilently, refreshKey]);

  const handleDelete = async (maintenanceId) => {
    if (!window.confirm("Delete this maintenance?")) return;
    const token = await getAccessTokenSilently();
    await fetch(`/api/maintenances/${maintenanceId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setMaintenances(maintenances.filter(m => m.id !== maintenanceId));
  };

  if (loading) return <div>Loading maintenances...</div>;
  if (!maintenances.length) return <div>No maintenances found.</div>;

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
        {maintenances.map(maintenance => (
          <tr key={maintenance.id}>
            <td>{maintenance.title}</td>
            <td>{maintenance.status}</td>
            <td>
              <button onClick={() => onEdit(maintenance)}>Edit</button>
            </td>
            <td>
              <button onClick={() => handleDelete(maintenance.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

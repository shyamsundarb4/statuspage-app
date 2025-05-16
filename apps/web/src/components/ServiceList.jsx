import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function ServiceList({ organizationId, onEdit, refreshKey }) {
  const { getAccessTokenSilently } = useAuth0();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!organizationId) return;
    (async () => {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const res = await fetch(`/api/organizations/${organizationId}/services`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setServices(data);
      setLoading(false);
    })();
  }, [organizationId, getAccessTokenSilently, refreshKey]);

  const handleDelete = async (serviceId) => {
    if (!window.confirm("Delete this service?")) return;
    const token = await getAccessTokenSilently();
    await fetch(`/api/services/${serviceId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setServices(services.filter(s => s.id !== serviceId));
  };

  if (loading) return <div>Loading services...</div>;
  if (!services.length) return <div>No services found.</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {services.map(service => (
          <tr key={service.id}>
            <td>{service.name}</td>
            <td>{service.status}</td>
            <td>
              <button onClick={() => onEdit(service)}>Edit</button>
            </td>
            <td>
              <button onClick={() => handleDelete(service.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
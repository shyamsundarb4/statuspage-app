// apps/web/src/components/CreateServiceForm.jsx
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useOrganizations from "../hooks/useOrganizations";

export default function CreateServiceForm() {
  const { getAccessTokenSilently } = useAuth0();
  const { organizations, loading } = useOrganizations();
  const [name, setName] = useState("");
  const [orgId, setOrgId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const res = await fetch("/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, organizationId: orgId }),
    });
    if (res.ok) {
      setMessage("Service created!");
      setName("");
      setOrgId("");
    } else {
      setMessage("Error creating service.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <select value={orgId} onChange={e => setOrgId(e.target.value)} required>
        <option value="">Select Organization</option>
        {organizations.map(org => (
          <option key={org.id} value={org.id}>{org.name}</option>
        ))}
      </select>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Service Name"
        required
      />
      <button type="submit">Create Service</button>
      {message && <div>{message}</div>}
    </form>
  );
}
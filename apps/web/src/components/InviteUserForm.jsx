// apps/web/src/components/InviteUserForm.jsx
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useOrganizations from "../hooks/useOrganizations";

export default function InviteUserForm() {
  const { getAccessTokenSilently } = useAuth0();
  const { organizations, loading } = useOrganizations();
  const [email, setEmail] = useState("");
  const [orgId, setOrgId] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const res = await fetch(`/api/organizations/${orgId}/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, role }),
    });
    if (res.ok) {
      setMessage("Invitation sent!");
      setEmail("");
    } else {
      setMessage("Error sending invitation.");
    }
  };

  if (loading) return <div>Loading organizations...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <select value={orgId} onChange={e => setOrgId(e.target.value)} required>
        <option value="">Select Organization</option>
        {organizations.map(org => (
          <option key={org.id} value={org.id}>{org.name}</option>
        ))}
      </select>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="User Email"
        required
      />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="ADMIN">Admin</option>
        <option value="MEMBER">Member</option>
      </select>
      <button type="submit">Invite User</button>
      {message && <div>{message}</div>}
    </form>
  );
}

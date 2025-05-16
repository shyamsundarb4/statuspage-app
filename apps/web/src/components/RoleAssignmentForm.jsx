// apps/web/src/components/RoleAssignmentForm.jsx
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function RoleAssignmentForm({ orgId, userId, currentRole, onRoleChanged }) {
  const { getAccessTokenSilently } = useAuth0();
  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const newRole = e.target.value;
    setRole(newRole);
    setLoading(true);
    const token = await getAccessTokenSilently();
    await fetch(`/api/organizations/${orgId}/members/${userId}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role: newRole }),
    });
    setLoading(false);
    onRoleChanged();
  };

  return (
    <select value={role} onChange={handleChange} disabled={loading}>
      <option value="ADMIN">Admin</option>
      <option value="MEMBER">Member</option>
    </select>
  );
}

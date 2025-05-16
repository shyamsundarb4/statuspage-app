// apps/web/src/components/RemoveUserButton.jsx
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function RemoveUserButton({ orgId, userId, onUserRemoved }) {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    setLoading(true);
    const token = await getAccessTokenSilently();
    await fetch(`/api/organizations/${orgId}/members/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setLoading(false);
    onUserRemoved();
  };

  return (
    <button onClick={handleRemove} disabled={loading}>
      Remove
    </button>
  );
}

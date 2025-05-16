import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function InviteUserForm({ organizationId }) {
  const { getAccessTokenSilently } = useAuth0();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("ORG_MEMBER");
  const [message, setMessage] = useState("");

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.post(
        `http://localhost:4000/organizations/${organizationId}/members`,
        { email, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(`User invited: ${res.data.userId || email}`);
      setEmail("");
      setRole("ORG_MEMBER");
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleInvite}>
      <h3>Invite User to Organization</h3>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="ORG_ADMIN">Admin</option>
        <option value="ORG_MEMBER">Member</option>
        <option value="ORG_VIEWER">Viewer</option>
      </select>
      <button type="submit">Invite</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default InviteUserForm;

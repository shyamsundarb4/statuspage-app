// apps/web/src/components/UserList.jsx
import React, { useState } from "react";
import useOrganizationMembers from "../hooks/useOrganizationMembers";
import RoleAssignmentForm from "./RoleAssignmentForm";
import RemoveUserButton from "./RemoveUserButton";

export default function UserList({ orgId }) {
  const { members, loading } = useOrganizationMembers(orgId);
  const [refresh, setRefresh] = useState(false);

  // Refresh list after role change or removal
  const handleRefresh = () => setRefresh(r => !r);

  if (loading) return <div>Loading members...</div>;
  if (!orgId) return <div>Select an organization to view members.</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Role</th>
          <th>Change Role</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {members.map(user => (
          <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <RoleAssignmentForm
                orgId={orgId}
                userId={user.id}
                currentRole={user.role}
                onRoleChanged={handleRefresh}
              />
            </td>
            <td>
              <RemoveUserButton
                orgId={orgId}
                userId={user.id}
                onUserRemoved={handleRefresh}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
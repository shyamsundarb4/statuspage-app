// apps/web/src/hooks/useOrganizationMembers.js
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function useOrganizationMembers(orgId) {
  const { getAccessTokenSilently } = useAuth0();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;
    (async () => {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const res = await fetch(`/api/organizations/${orgId}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMembers(data);
      setLoading(false);
    })();
  }, [orgId, getAccessTokenSilently]);

  return { members, loading };
}
// apps/web/src/hooks/useOrganizations.js
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function useOrganizations() {
  const { getAccessTokenSilently } = useAuth0();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      const res = await fetch("/api/organizations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrganizations(data);
      setLoading(false);
    })();
  }, [getAccessTokenSilently]);

  return { organizations, loading };
}

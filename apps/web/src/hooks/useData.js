import { useEffect, useState } from "react";
import { getOrganizations, getServices } from "../api";

export function useOrganizations() {
  const [organizations, setOrganizations] = useState([]);
  useEffect(() => {
    getOrganizations().then(res => setOrganizations(res.data));
  }, []);
  return organizations;
}

export function useServices(orgId) {
  const [services, setServices] = useState([]);
  useEffect(() => {
    if (orgId) {
      getServices(orgId).then(res => setServices(res.data));
    } else {
      setServices([]);
    }
  }, [orgId]);
  return services;
}

import axios from "axios";

const API_BASE = "http://localhost:4000";

// Public endpoints
export const getOrganizations = () => axios.get(`${API_BASE}/organizations`);
export const getServices = (orgId) => axios.get(`${API_BASE}/services?organizationId=${orgId}`);
export const getIncidents = () => axios.get(`${API_BASE}/incidents`);
export const getMaintenances = () => axios.get(`${API_BASE}/maintenances`);
export const getStatusHistory = () => axios.get(`${API_BASE}/status-history`);

// Protected endpoints (require token)
export const createService = (data, token) =>
  axios.post(`${API_BASE}/services`, data, { headers: { Authorization: `Bearer ${token}` } });

export const updateService = (id, data, token) =>
  axios.put(`${API_BASE}/services/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteService = (id, token) =>
  axios.delete(`${API_BASE}/services/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const createIncident = (data, token) =>
  axios.post(`${API_BASE}/incidents`, data, { headers: { Authorization: `Bearer ${token}` } });

export const createMaintenance = (data, token) =>
  axios.post(`${API_BASE}/maintenances`, data, { headers: { Authorization: `Bearer ${token}` } });

export const inviteOrgMember = (orgId, data, token) =>
  axios.post(`${API_BASE}/organizations/${orgId}/members`, data, { headers: { Authorization: `Bearer ${token}` } });

export const listOrgMembers = (orgId, token) =>
  axios.get(`${API_BASE}/organizations/${orgId}/members`, { headers: { Authorization: `Bearer ${token}` } });

export const changeOrgMemberRole = (orgId, userId, data, token) =>
  axios.put(`${API_BASE}/organizations/${orgId}/members/${userId}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const removeOrgMember = (orgId, userId, token) =>
  axios.delete(`${API_BASE}/organizations/${orgId}/members/${userId}`, { headers: { Authorization: `Bearer ${token}` } });

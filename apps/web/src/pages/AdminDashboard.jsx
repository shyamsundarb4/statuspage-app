import React, { useState, useCallback } from "react";
import { useOrganizations, useServices } from "../hooks/useData";
import CreateServiceForm from "./CreateServiceForm";
import CreateIncidentForm from "./CreateIncidentForm";
import CreateMaintenanceForm from "./CreateMaintenanceForm";
import InviteUserForm from "../components/InviteUserForm";
import UserList from "../components/UserList";
import ServiceList from "../components/ServiceList";
import EditServiceModal from "../components/EditServiceModal";
import IncidentList from "../components/IncidentList";
import EditIncidentModal from "../components/EditIncidentModal";
import MaintenanceList from "../components/MaintenanceList";
import EditMaintenanceModal from "../components/EditMaintenanceModal";
import useSocket from "../hooks/useSocket";

function AdminDashboard() {
  const organizations = useOrganizations();
  const [selectedOrg, setSelectedOrg] = useState("");
  const services = useServices(selectedOrg);
  const [selectedService, setSelectedService] = useState("");
  const [editingService, setEditingService] = useState(null);
  const [editingIncident, setEditingIncident] = useState(null);
  const [editingMaintenance, setEditingMaintenance] = useState(null);

  // State to force refresh lists after real-time events
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = useCallback(() => setRefreshKey(k => k + 1), []);

  // Listen for real-time events from backend
  useSocket("http://localhost:4000", {
    "incident:created": triggerRefresh,
    "incident:updated": triggerRefresh,
    "incident:resolved": triggerRefresh,
    "maintenance:created": triggerRefresh,
    "maintenance:updated": triggerRefresh,
    "maintenance:deleted": triggerRefresh,
    "maintenance:completed": triggerRefresh,
    "service:created": triggerRefresh,
    "service:updated": triggerRefresh,
    "service:deleted": triggerRefresh,
  });

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <label>
          Select Organization:
          <select value={selectedOrg} onChange={e => setSelectedOrg(e.target.value)}>
            <option value="">-- Select --</option>
            {organizations.map(org => (
              <option key={org.id} value={org.id}>{org.name}</option>
            ))}
          </select>
        </label>
      </div>
      {selectedOrg && (
        <>
          <CreateServiceForm organizationId={selectedOrg} />
          <InviteUserForm organizationId={selectedOrg} />
          <h3>Organization Members</h3>
          <UserList organizationId={selectedOrg} />
          <h3>Services</h3>
          <ServiceList
            key={refreshKey}
            organizationId={selectedOrg}
            onEdit={service => setEditingService(service)}
          />
          {editingService && (
            <EditServiceModal
              service={editingService}
              onClose={() => setEditingService(null)}
              onUpdated={triggerRefresh}
            />
          )}
          <div>
            <label>
              Select Service:
              <select value={selectedService} onChange={e => setSelectedService(e.target.value)}>
                <option value="">-- Select --</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>
            </label>
          </div>
          {selectedService && (
            <>
              <CreateIncidentForm organizationId={selectedOrg} serviceId={selectedService} />
              <CreateMaintenanceForm serviceId={selectedService} />
              <h3>Incidents</h3>
              <IncidentList
                key={refreshKey}
                serviceId={selectedService}
                onEdit={incident => setEditingIncident(incident)}
              />
              {editingIncident && (
                <EditIncidentModal
                  incident={editingIncident}
                  onClose={() => setEditingIncident(null)}
                  onUpdated={triggerRefresh}
                />
              )}
              <h3>Maintenances</h3>
              <MaintenanceList
                key={refreshKey}
                serviceId={selectedService}
                onEdit={maintenance => setEditingMaintenance(maintenance)}
              />
              {editingMaintenance && (
                <EditMaintenanceModal
                  maintenance={editingMaintenance}
                  onClose={() => setEditingMaintenance(null)}
                  onUpdated={triggerRefresh}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import useSocket from '../hooks/useSocket';

function StatusPage() {
  const [services, setServices] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchAll = useCallback(() => {
    axios.get('http://localhost:4000/services').then(res => setServices(res.data));
    axios.get('http://localhost:4000/incidents').then(res => setIncidents(res.data));
    axios.get('http://localhost:4000/maintenances').then(res => setMaintenances(res.data));
    axios.get('http://localhost:4000/status-history').then(res => setHistory(res.data));
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Listen for real-time events and refresh data
  useSocket("http://localhost:4000", {
    "service:created": fetchAll,
    "service:updated": fetchAll,
    "service:deleted": fetchAll,
    "incident:created": fetchAll,
    "incident:updated": fetchAll,
    "incident:resolved": fetchAll,
    "maintenance:created": fetchAll,
    "maintenance:updated": fetchAll,
    "maintenance:deleted": fetchAll,
    "maintenance:completed": fetchAll,
  });

  return (
    <div>
      <h2>Current Service Status</h2>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            <strong>{service.name}</strong>: {service.status}
          </li>
        ))}
      </ul>

      <h2>Active Incidents</h2>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>{incident.title}</strong> - {incident.status}
          </li>
        ))}
      </ul>

      <h2>Scheduled Maintenances</h2>
      <ul>
        {maintenances.map(maintenance => (
          <li key={maintenance.id}>
            <strong>{maintenance.title}</strong> ({maintenance.status})
          </li>
        ))}
      </ul>

      <h2>Status Change Timeline</h2>
      <ul>
        {history.map(item => (
          <li key={item.id}>
            {item.service?.name || 'Unknown Service'}: {item.status} at {new Date(item.changedAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatusPage;
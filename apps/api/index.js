const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../../.env' });
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Allow CORS for your frontend
app.use(cors());
app.use(express.json());

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Change to your frontend URL in production
    methods: ["GET", "POST", "PATCH", "DELETE"]
  }
});

// Make io accessible in routes/controllers
app.set('io', io);

// Optional: Log client connections
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Health check route (can stay here)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Mount resource routes
app.use('/users', require('./routes/users'));
app.use('/teams', require('./routes/teams'));
app.use('/organizations', require('./routes/organizations'));
app.use('/services', require('./routes/services'));
app.use('/incidents', require('./routes/incidents'));
app.use('/maintenances', require('./routes/maintenances'));
app.use('/status-history', require('./routes/statusHistory'));
// Add more as needed

// (Optional) 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// (Optional) Error handler middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Invalid or missing token' });
  } else {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`API server running with Socket.IO on http://localhost:${PORT}`);
});
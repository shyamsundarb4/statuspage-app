const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listIncidents = async (req, res) => {
  try {
    const incidents = await prisma.incident.findMany();
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createIncident = async (req, res, next, io) => {
  try {
    const { title, status, serviceId, organizationId } = req.body;
    const incident = await prisma.incident.create({
      data: { title, status, serviceId, organizationId }
    });
    if (io) io.emit('incident:created', incident);
    res.json(incident);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateIncident = async (req, res, next, io) => {
  try {
    const { id } = req.params;
    const { title, status, resolvedAt } = req.body;
    const incident = await prisma.incident.update({
      where: { id },
      data: { title, status, resolvedAt }
    });
    if (io) io.emit('incident:updated', incident);
    res.json(incident);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.resolveIncident = async (req, res, next, io) => {
  try {
    const { id } = req.params;
    const incident = await prisma.incident.update({
      where: { id },
      data: { status: 'RESOLVED', resolvedAt: new Date() }
    });
    if (io) io.emit('incident:resolved', incident);
    res.json(incident);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
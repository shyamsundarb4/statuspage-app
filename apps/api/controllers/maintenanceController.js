const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listMaintenances = async (req, res) => {
  try {
    const maintenances = await prisma.maintenance.findMany({
      include: { service: true }
    });
    res.json(maintenances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMaintenance = async (req, res, next, io) => {
  try {
    const { title, description, status, serviceId, scheduledStart, scheduledEnd } = req.body;
    const maintenance = await prisma.maintenance.create({
      data: {
        title,
        description,
        status,
        serviceId,
        scheduledStart: new Date(scheduledStart),
        scheduledEnd: new Date(scheduledEnd)
      }
    });
    if (io) io.emit('maintenance:created', maintenance);
    res.json(maintenance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMaintenance = async (req, res, next, io) => {
  try {
    const { id } = req.params;
    const { title, description, status, scheduledStart, scheduledEnd } = req.body;
    const maintenance = await prisma.maintenance.update({
      where: { id },
      data: {
        title,
        description,
        status,
        scheduledStart: new Date(scheduledStart),
        scheduledEnd: new Date(scheduledEnd)
      }
    });
    if (io) io.emit('maintenance:updated', maintenance);
    res.json(maintenance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMaintenance = async (req, res, next, io) => {
  try {
    const { id } = req.params;
    await prisma.maintenance.delete({ where: { id } });
    if (io) io.emit('maintenance:deleted', id);
    res.json({ message: 'Maintenance deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.completeMaintenance = async (req, res, next, io) => {
  try {
    const { id } = req.params;
    const maintenance = await prisma.maintenance.update({
      where: { id },
      data: { status: 'COMPLETED' }
    });
    if (io) io.emit('maintenance:completed', maintenance);
    res.json(maintenance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listServices = async (req, res) => {
  const services = await prisma.service.findMany();
  res.json(services);
};

exports.createService = async (req, res, next, io) => {
  const { name, status, organizationId } = req.body;
  const service = await prisma.service.create({
    data: { name, status, organizationId }
  });
  if (io) io.emit('service:created', service);
  res.json(service);
};

exports.updateService = async (req, res, next, io) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const service = await prisma.service.update({
    where: { id },
    data: { name, status }
  });
  if (io) io.emit('service:updated', service);
  res.json(service);
};

exports.deleteService = async (req, res, next, io) => {
  const { id } = req.params;
  await prisma.service.delete({ where: { id } });
  if (io) io.emit('service:deleted', id);
  res.json({ message: 'Service deleted' });
};

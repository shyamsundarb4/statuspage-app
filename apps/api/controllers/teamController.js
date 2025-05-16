const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createTeam = async (req, res) => {
  const { name, organizationId } = req.body;
  const team = await prisma.team.create({
    data: { name, organizationId }
  });
  res.json(team);
};

exports.inviteUser = async (req, res) => {
  const { teamId } = req.params;
  const { email, role } = req.body;
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({ data: { email } });
  }
  const membership = await prisma.membership.create({
    data: { userId: user.id, teamId, role }
  });
  res.json(membership);
};

exports.changeRole = async (req, res) => {
  const { teamId, userId } = req.params;
  const { role } = req.body;
  const membership = await prisma.membership.updateMany({
    where: { teamId, userId },
    data: { role }
  });
  res.json(membership);
};

exports.removeUser = async (req, res) => {
  const { teamId, userId } = req.params;
  await prisma.membership.deleteMany({ where: { teamId, userId } });
  res.json({ message: 'User removed from team' });
};

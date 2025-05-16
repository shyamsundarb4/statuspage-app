const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new organization
exports.createOrganization = async (req, res) => {
  try {
    const { name } = req.body;
    const organization = await prisma.organization.create({
      data: { name }
    });
    res.json({
      id: organization.id,
      name: organization.name
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List all organizations
exports.listOrganizations = async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// (Optional) Get a single organization by ID
exports.getOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await prisma.organization.findUnique({
      where: { id }
    });
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// (Optional) Delete an organization
exports.deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.organization.delete({ where: { id } });
    res.json({ message: 'Organization deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Add a user to an organization with a specific role
exports.addOrgMember = async (req, res) => {
  try {
    const { organizationId } = req.params;
    const { email, role } = req.body;
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email } });
    }
    const orgMembership = await prisma.organizationMembership.create({
      data: { userId: user.id, organizationId, role }
    });
    res.json(orgMembership);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List all members of an organization (with their roles)
exports.listOrgMembers = async (req, res) => {
  try {
    const { organizationId } = req.params;
    const members = await prisma.organizationMembership.findMany({
      where: { organizationId },
      include: { user: true }
    });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Change a user's role in an organization
exports.changeOrgMemberRole = async (req, res) => {
  try {
    const { organizationId, userId } = req.params;
    const { role } = req.body;
    const updated = await prisma.organizationMembership.updateMany({
      where: { organizationId, userId },
      data: { role }
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a user from an organization
exports.removeOrgMember = async (req, res) => {
  try {
    const { organizationId, userId } = req.params;
    await prisma.organizationMembership.deleteMany({
      where: { organizationId, userId }
    });
    res.json({ message: 'User removed from organization' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

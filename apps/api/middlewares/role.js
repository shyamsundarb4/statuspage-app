const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Middleware to check if the user has one of the allowed roles in a team.
 * Usage: checkRoles(['ADMIN', 'MEMBER'])
 */
function checkRoles(allowedRoles = []) {
  return async (req, res, next) => {
    try {
      // Get Auth0 user ID from JWT (sub claim)
      const auth0Id = req.auth && req.auth.sub;
      if (!auth0Id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Get teamId from params or body
      const teamId = req.params.teamId || req.body.teamId;
      if (!teamId) {
        return res.status(400).json({ error: 'Missing teamId' });
      }

      // Find the user in your User table by Auth0 email
      const user = await prisma.user.findUnique({
        where: { email: req.auth.email }
      });
      if (!user) {
        return res.status(403).json({ error: 'User not found' });
      }

      // Find the membership
      const membership = await prisma.membership.findFirst({
        where: { userId: user.id, teamId }
      });
      if (!membership) {
        return res.status(403).json({ error: 'Not a member of this team' });
      }

      // Check if user's role is in allowedRoles
      if (!allowedRoles.includes(membership.role)) {
        return res.status(403).json({ error: `Requires one of roles: ${allowedRoles.join(', ')}` });
      }

      // All good!
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = { checkRoles };
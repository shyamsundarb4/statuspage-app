const express = require('express');
const router = express.Router();
const orgController = require('../controllers/organizationController');

// Public endpoints
router.post('/', orgController.createOrganization);
router.get('/', orgController.listOrganizations);
const { checkJwt } = require('../middlewares/auth');
const { checkOrgRoles } = require('../middlewares/orgRole');

// Add a user to an organization (ORG_ADMIN only)
router.post('/:organizationId/members', checkJwt, checkOrgRoles(['ORG_ADMIN']), orgController.addOrgMember);

// List all members of an organization (ORG_ADMIN and ORG_MEMBER)
router.get('/:organizationId/members', checkJwt, checkOrgRoles(['ORG_ADMIN', 'ORG_MEMBER']), orgController.listOrgMembers);

// Change a user's role in an organization (ORG_ADMIN only)
router.put('/:organizationId/members/:userId', checkJwt, checkOrgRoles(['ORG_ADMIN']), orgController.changeOrgMemberRole);

// Remove a user from an organization (ORG_ADMIN only)
router.delete('/:organizationId/members/:userId', checkJwt, checkOrgRoles(['ORG_ADMIN']), orgController.removeOrgMember);
module.exports = router;

const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { checkJwt } = require('../middlewares/auth');
const { checkRoles } = require('../middlewares/role');

// Only ADMINs can invite users
router.post('/:teamId/invite', checkJwt, checkRoles('ADMIN'), teamController.inviteUser);

// Only ADMINs can change roles
router.put('/:teamId/members/:userId', checkJwt, checkRoles('ADMIN'), teamController.changeRole);

// Only ADMINs can remove users
router.delete('/:teamId/members/:userId', checkJwt, checkRoles('ADMIN'), teamController.removeUser);

// Anyone in the team can view members, etc.
module.exports = router;

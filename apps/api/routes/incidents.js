const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');
const { checkJwt } = require('../middlewares/auth');

// Pass io to controller methods that modify data
router.get('/', incidentController.listIncidents);
router.post('/', checkJwt, (req, res, next) => incidentController.createIncident(req, res, next, req.app.get('io')));
router.put('/:id', checkJwt, (req, res, next) => incidentController.updateIncident(req, res, next, req.app.get('io')));
router.post('/:id/resolve', checkJwt, (req, res, next) => incidentController.resolveIncident(req, res, next, req.app.get('io')));

module.exports = router;

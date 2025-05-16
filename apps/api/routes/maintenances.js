const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const { checkJwt } = require('../middlewares/auth');

router.get('/', maintenanceController.listMaintenances);
router.post('/', checkJwt, (req, res, next) => maintenanceController.createMaintenance(req, res, next, req.app.get('io')));
router.put('/:id', checkJwt, (req, res, next) => maintenanceController.updateMaintenance(req, res, next, req.app.get('io')));
router.delete('/:id', checkJwt, (req, res, next) => maintenanceController.deleteMaintenance(req, res, next, req.app.get('io')));
router.post('/:id/complete', checkJwt, (req, res, next) => maintenanceController.completeMaintenance(req, res, next, req.app.get('io')));

module.exports = router;

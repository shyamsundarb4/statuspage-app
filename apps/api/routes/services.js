const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { checkJwt } = require('../middlewares/auth');

router.get('/', serviceController.listServices);
router.post('/', checkJwt, (req, res, next) => serviceController.createService(req, res, next, req.app.get('io')));
router.put('/:id', checkJwt, (req, res, next) => serviceController.updateService(req, res, next, req.app.get('io')));
router.delete('/:id', checkJwt, (req, res, next) => serviceController.deleteService(req, res, next, req.app.get('io')));

module.exports = router;

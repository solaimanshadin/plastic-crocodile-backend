const router    =   require('express').Router();
const errorHandler   =   require('../middlewares/errors');
const debrisController = require('../controllers/debrisController');

router.get('/detection-statistics', debrisController.detectionStatistics, errorHandler);

module.exports = router;
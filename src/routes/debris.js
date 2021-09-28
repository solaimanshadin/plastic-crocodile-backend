const router    =   require('express').Router();
const errorHandler   =   require('../middlewares/errors');
const debrisController = require('../controllers/debrisController');

router.get('/', debrisController.getDebris, errorHandler);
router.get('/:id', debrisController.getDebrisById, errorHandler);
router.post('/', debrisController.createDebris, errorHandler);
router.patch('/:id', debrisController.getDebrisById, errorHandler);
router.delete('/:id', debrisController.deleteDebris, errorHandler);

module.exports = router;
const router = require('express').Router();

router.use('/debris', require('./debris'));
router.use('/stats', require('./stats'));

module.exports = router;

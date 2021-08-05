const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
router.use(require('./PairRoutes'));
router.use(require('./TokenRoutes'));
router.use(require('./userRoutes'));

module.exports = router;

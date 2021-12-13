const router = require('express').Router();
const routeUsers = require('./routeUsers');
const routeThoughts = require('./routeThoughts');

router.use('/users', routeUsers);
router.use('/thoughts', routeThoughts);

module.exports = router;
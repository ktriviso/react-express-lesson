const router = require('express').Router();
const greetingRouter = require('./greetings');

/* GET home page. */
router.use('/greetings', greetingRouter);

module.exports = router;

const router = require('express').Router();

const greetingsController = require('../controllers/greetingsController');
const responseController = require('../controllers/responseController');

/* GET home page. */
router.route('/')
  .get(
    greetingsController.index,
    responseController.sendData,
    responseController.handleError
  )
  .post(
    greetingsController.create,
    responseController.sendData,
    responseController.handleError
  );

router.route('/:id')
  .delete(
    greetingsController.destroy,
    responseController.sendData,
    responseController.handleError
  )

module.exports = router;

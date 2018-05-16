const greeting = require('../models/greeting');

module.exports = {
  index(req, res, next) {
    greeting.getAll()
      .then(greetings => {
        res.locals.data = greetings;
        next();
      })
      .catch(next);
  },

  create(req, res, next) {
    greeting.create(req.body)
      .then(newGreeting => {
        res.locals.data = newGreeting;
        next();
      })
      .catch(next);
  },

  destroy(req, res, next) {
    greeting.destroy(req.params.id)
      .then(next)
      .catch(next);
  }
}

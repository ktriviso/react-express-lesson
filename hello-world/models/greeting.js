const db = require('../config/connection');

function getAll() {
  return db.any(`SELECT * FROM greetings`);
}

function create(greeting) {
  return db.one(`
    INSERT INTO greetings (message)
    VALUES ($/message/)
    RETURNING *
  `, greeting)
}

function destroy(id) {
  return db.none(`
    DELETE FROM greetings
    WHERE id = $1
  `, id)
}

module.exports = {
  getAll,
  create,
  destroy
}

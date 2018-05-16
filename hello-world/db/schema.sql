\c greetings_db

DROP TABLE IF EXISTS greetings;

CREATE TABLE greetings (
  id SERIAL PRIMARY KEY,
  message VARCHAR(255)
)

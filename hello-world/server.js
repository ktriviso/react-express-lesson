const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');

const apiRouter = require('./routes/api');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

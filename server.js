const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

// import environmental variables
require('dotenv').config({ path: 'variables.env' });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files
app.use(express.static('public'));

// handle routes
app.use('/', routes);

// connect to database
mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to ${port}`);
});

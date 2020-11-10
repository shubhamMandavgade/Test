const express = require('express');
const cors = require('cors');
var app = express();
const bodyParser = require('body-parser');

const { mongoose } = require('./db.js');
var personController = require('./controllers/personControllers');

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use('/person', personController);

  
const port = 3000  
app.listen(port, () => console.log('Server started at port : 3000'));
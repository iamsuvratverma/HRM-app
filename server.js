const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var routes = require('./route/routes');
const cors = require('cors');


app.use(cors(
  {
    origin: "http://localhost:4200"
  }

));

app.listen(9992, function () {
  console.log('Server is running at http://localhost:9992');
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Place your code here that depends on the database connection
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

 

app.use(express.json());
app.use(routes);

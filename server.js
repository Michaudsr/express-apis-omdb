require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')
// const url = require('url')
// const querystring = require('querystring')
// const results = require('/results')

let API_KEY = process.env.API_KEY
// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/sample', (req, res)=>{
  var qs = {
    params: {
      s: 'star wars',
      apikey: API_KEY
    }
  };
  axios.get('http://www.omdbapi.com', qs)
  .then((response)=>{
    console.log(response.data)
    let episodes = response.data.Search
    // setting a variable to our data
    res.render('home', {episodes})
    
  })
  .catch(err => {
    console.log(err)
})
});

app.get('/', (req, res)=>{
  res.render('index')
});



app.get('/results', (req, res)=>{
  console.log('req.query', req.query)
  var qs = {
    params: {
      s: req.query.q,
      apikey: API_KEY
    }
  };
  axios.get('http://www.omdbapi.com', qs)
  .then((response)=>{
    console.log(response.data)
    let episodes = response.data.Search
    // setting a variable to our data
    res.render('results', {episodes})
    
  })
  .catch(err => {
    console.log(err)
})
});






// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;


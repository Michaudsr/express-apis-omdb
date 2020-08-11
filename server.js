require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
const { default: Axios } = require('axios');
const { Router } = require('express');
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
app.use('/fave', require('./routes/fave'));
// Adds some logging to each request
app.use(require('morgan')('dev'));
// app.use('/faves', requiew('./routes/faves'));

// Routes
// app.get('/sample', (req, res)=>{
//   var qs = {
//     params: {
//       s: 'star wars',
//       apikey: API_KEY
//     }
//   };
//   axios.get('http://www.omdbapi.com', qs)
//   .then((response)=>{
//     console.log(response.data)
//     let episodes = response.data.Search
//     // setting a variable to our data
//     res.render('home', { data: episodes})
    
//   })
//   .catch(err => {
//     console.log(err)
// })
// });

app.get('/', (req, res)=>{
  res.render('index')
});



app.get('/results', (req, res)=>{
  let search = req.query.q;
  let qs = {
    params: {
      s: search,
      apikey: API_KEY
    }
  };
  axios.get('http://www.omdbapi.com', qs)
  .then((response)=>{
    console.log(response.data)
    let movies = response.data.Search;
    console.log(movies);
    // setting a variable to our data
    res.render('results', { data: movies})
    
  })
  .catch(err => {
    console.log(err)
})
});

app.get('/movies/:movie_id', (req, res) => {
  let imdbId = req.params.movie_id;
  let qs = {
    params: {
      i: imdbId,
      apikey: API_KEY
    }
  };
  axios.get('https://www.omdbapi.com', qs)
  .then(response => {
    let movieData = response.data;
    

    res.render('detail', { data: movieData });
  })
  .catch(error => {
    console.log('Error', error);
  });
});

// app.post('/faves', async (req, res) => {
//   try {
//     await db.faves.findOrCreate({
//       where:{
//         name: req.body.name
//       },
//     })
//     res.redirect('/faves')
//   } catch (err){
//     console.log('Error', err)
//   }
// })

// Router.get('/faves', (req, res)=>{
//   db.fave.findAll ({
//     where: {
//       name: req.body.name
//     }
//   })
//   .then(fave => {
//     res.render('movies', {movies})
//   })
// })




// The app.listen function returns a server handle
const port = process.env.PORT || 3000;
// function listenForPort( {
//   console.log(`Server is running on port ${port}`);
// })
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;


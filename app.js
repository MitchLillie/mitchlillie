// 'use strict'

// Require Express and Morgan
var express = require('express')
var logger = require('morgan')

// Connect to Knex via environment variables or knexfile in local development
var env = process.env.NODE_ENV || 'development'
var knexConfig = process.env.HEROKU ? {
  client: 'postgresql',
  connection: {
    host: process.env.APP_DB_HOST,
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD,
    database: process.env.APP_DB_NAME
  }
} : require('./knexfile.js')[env]
var knex = require('knex')(knexConfig)

// Instantiate Express and settings
var app = express()
app.use(logger('dev'))
app.use('/static', express.static(__dirname + '/public'))
app.set('view engine', 'jade')
app.set('views', __dirname + '/templates')

// Get index
app.get('/', function (req, res) {
  // Grab all lead info for case studies from PostgreSQL
  knex('case_studies')
    .select('jumbosrc', 'jumboalt', 'leadtext', 'leadpara')
    .then(
      function (result) {
        // Show newest first and set within single key for Jade iteration
        result.reverse()
        var obj = {
          cs: result
        }
        // Set numbers as words for page anchors
        var numbers = ['one', 'two', 'three', 'four', 'five']
        for (var i = 0; i < obj.cs.length; i++) {
          obj.cs[i].number = numbers[i]
        }
        console.log(obj)
        res.render('index', obj)
      })
})

// Get route for each case study
app.get('/casestudies/:title?', function (req, res) {
  var title = req.params.title
  // Send /casestudies back to #casestudies on index
  if (title === undefined) {
    res.redirect('/#casestudies')
  } else {
    // Select the case study with a matching title
    knex('case_studies')
			.where('leadtext', '=', title)
			.select()
			.then(
        function (result) {
          // Handle unfound results and redirect to #casestudies on index
          if (result[0] === undefined) {
            res.redirect('/#casestudies')
          } else {
            res.render('casestudy', result[0])
          }
        })
  }
})

// Render static story template
app.get('/story', function (req, res) {
  res.render('story')
})

// Render static resume template
app.get('/resume', function (req, res) {
  res.render('resume')
})

// Listen on port 3000 or whatever Heroku would like
app.listen(process.env.PORT || 3000)

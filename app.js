// 'use strict'

var express = require('express')
var logger = require('morgan')

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

var app = express()
app.use(logger('dev'))
app.use('/static', express.static(__dirname + '/public'))

app.set('view engine', 'jade')
app.set('views', __dirname + '/templates')

app.get('/', function (req, res) {
  knex('case_studies')
    .select('jumbosrc', 'jumboalt', 'leadtext', 'leadpara')
    .then(
      function (result) {
        result.reverse()
        var obj = {
          cs: result
        }
        var numbers = ['one', 'two', 'three', 'four', 'five']
        for (var i = 0; i < obj.cs.length; i++) {
          obj.cs[i].number = numbers[i]
        }
        console.log(obj)
        res.render('index', obj)
      })
})

app.get('/story', function (req, res) {
  res.render('story')
})

app.get('/casestudies/:title?', function (req, res) {
  var title = req.params.title
  if (title === undefined) {
    res.status(503)
    res.send('This page is under construction!')
  } else {
    knex('case_studies')
			.where('leadtext', '=', title)
			.select()
			.then(
        function (result) {
          console.log(result[0])
          res.render('casestudy', result[0])
        })
  }
})

app.get('/resume', function (req, res) {
  res.render('resume')
})

app.listen(process.env.PORT || 3000)

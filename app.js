// 'use strict'

var express = require('express')
var logger = require('morgan')

// var pg = require('pg')
var env = process.env.NODE_ENV || 'development'
var knexConfig = require('./knexfile.js')[env]
var knex = require('knex')(knexConfig)

var app = express()
app.use(logger('dev'))
app.use('/static', express.static(__dirname + '/public'))

app.set('view engine', 'jade')
app.set('views', __dirname + '/templates')

app.get('/', function (req, res) {
  res.render('index')
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

app.listen(process.env.PORT || 3000)

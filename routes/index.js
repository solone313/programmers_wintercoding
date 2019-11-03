var express = require('express');
var models = require('../models');
var courses = require('./courses');
var timetables = require('./timetables');
var router = express.Router();

/* GET home page. */
router.use('/courses', courses)
router.use('/timetable', timetables)

router.get('/', function(req, res, next) {
  models.course.findAll().then( result => {
    res.render("index", {
      courses: result
    });
  });
});

module.exports = router;

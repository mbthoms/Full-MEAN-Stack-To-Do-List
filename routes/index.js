var express = require('express');
var router = express.Router();
var Task = require('../models/task');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET tasks */
router.get('/tasks', function(req, res, next) {
  // get the tasks from our model and send them back in json
  Task.find(function(err, tasks) {
    if (err) {
      return next(err);
    }

    console.log(tasks);
    res.json(tasks);
  });
});

/* ADD task */
router.post('/tasks', function(req, res, next) {
  var task = new Task(req.body);

  // try to add
  task.save(function(err, task) {
    if (err) {
      return next(err);
    }
    res.end();
    //res.json(task);
  });
});

/* DELETE task */
router.delete('/tasks/:id', function(req, res, next) {
  var id = req.params.id;

  Task.remove({ _id: id }, function(err, task) {
    if (err) { return next(err); }
  });
  res.end();
});

module.exports = router;

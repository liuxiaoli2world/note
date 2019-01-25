var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/students', function(req, res) {
  fs.readFile('./db.json', function(err, data) {
    if (err) {
      res.status(500).send('Server error!');
    } else {
      res.render('students.html', JSON.parse(data.toString()));
    }
  });
});

router.get('/student/new', function(req, res) {
  res.render('student.html');
});

router.post('/student/new', function(req, res) {
  console.log('post ');
  fs.readFile('./db.json', function(err, data) {
    if (err) {
      res.status(500).send('Server error!');
    } else {
      var students = JSON.parse(data.toString()).students;
      students.unshift(req.body);
      fs.writeFile(
        './db.json',
        JSON.stringify({ students: students }),
        function(err, data) {
          if (err) {
            res.status(500).send('Server error!');
          } else {
            res.redirect('/students');
          }
        }
      );
    }
  });
});

module.exports = router;

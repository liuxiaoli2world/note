const express = require('express');
const student = require('./student');

const router = express.Router();

router.get('/students', (req, res) => {
  student.find((err, students) => {
    if (err) {
      res.status(500).send('Server error!');
    } else {
      res.render('students.html', { students });
    }
  });
});

router.get('/student/new', (req, res) => {
  res.render('student.html',
    {
      name: '', age: 18, gender: 1, hobbies: '',
    });
});

router.post('/student/new', (req, res) => {
  student.add(req.body, (err) => {
    if (err) {
      res.status(500).send('Server error!');
    } else {
      res.redirect('/students');
    }
  });
});

router.get('/student/edit', (req, res) => {
  student.findById(req.query.id, (err, stu) => {
    if (err) {
      res.status(500).send('Server error!');
    } else {
      res.render('student.html', stu);
    }
  });
});

router.post('/student/edit', (req, res) => {
  student.edit(req.body, (err) => {
    if (err) {
      res.status(500).send('Server error!');
    } else {
      res.redirect('/students');
    }
  });
});

router.get('/student/delete', (req, res) => {
  student.deleteById(req.query.id, (err) => {
    if (err) {
      res.status(500).send('Server error!');
    } else {
      res.redirect('/students');
    }
  });
});

module.exports = router;

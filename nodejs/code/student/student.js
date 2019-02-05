const fs = require('fs');

exports.find = function (callback) {
  fs.readFile('./db.json', (err, data) => {
    if (err) {
      callback(err);
    } else {
      const { students } = JSON.parse(data.toString());
      callback(null, students);
    }
  });
};

exports.add = function (student, callback) {
  fs.readFile('./db.json', (err, data) => {
    if (err) {
      callback(err);
    } else {
      const { students } = JSON.parse(data.toString());
      const nId = `${parseInt(students[0].id, 10) + 1}`;
      const stu = { ...student };
      stu.id = nId;
      students.unshift(stu);
      fs.writeFile(
        './db.json',
        JSON.stringify({ students }),
        (err1) => {
          if (err) {
            callback(err1);
          } else {
            callback(null);
          }
        },
      );
    }
  });
};

exports.findById = function (id, callback) {
  fs.readFile('./db.json', (err, data) => {
    if (err) {
      callback(err);
    } else {
      const { students } = JSON.parse(data.toString());
      const student = students.find(item => item.id === id);
      callback(null, student);
    }
  });
};

exports.edit = function (student, callback) {
  fs.readFile('./db.json', (err, data) => {
    if (err) {
      callback(err);
    } else {
      const { students } = JSON.parse(data.toString());
      const s = students.find(item => item.id === student.id);
      Object.assign(s, student);

      fs.writeFile(
        './db.json',
        JSON.stringify({ students }),
        (err1) => {
          if (err) {
            callback(err1);
          } else {
            callback(null);
          }
        },
      );
    }
  });
};

exports.deleteById = function (id, callback) {
  fs.readFile('./db.json', (err, data) => {
    if (err) {
      callback(err);
    } else {
      const { students } = JSON.parse(data.toString());
      const index = students.findIndex(item => item.id === id);
      console.log(id, index);
      students.splice(index, 1);
      fs.writeFile(
        './db.json',
        JSON.stringify({ students }),
        (err1) => {
          if (err) {
            callback(err1);
          } else {
            callback(null);
          }
        },
      );
    }
  });
};

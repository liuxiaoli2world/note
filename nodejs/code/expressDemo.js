var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var express_template = require('express-art-template');
var app = express();

app.engine('html', express_template);
app.set('views', path.join(__dirname, 'html'));

var comments = [
  { message: '评论一，幅度萨芬撒旦发。', date: '2019-01-18' },
  { message: '评论一，幅度萨芬撒旦发。', date: '2019-01-18' },
  { message: '评论一，幅度萨芬撒旦发。', date: '2019-01-18' },
  { message: '评论一，幅度萨芬撒旦发。', date: '2019-01-18' },
  { message: '评论一，幅度萨芬撒旦发。', date: '2019-01-18' }
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('template.html', comments);
});

app.get('/post', function(req, res) {
  res.render('post.html');
});

app.post('/comment', function(req, res) {
  var comment = req.query;
  comments.unshift(req.body);
  res.redirect('/');
});

app.get('/comment', function(req, res) {
  var comment = req.query;
  comments.unshift(comment);
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('服务器启动成功');
});

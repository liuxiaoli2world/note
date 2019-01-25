var http = require('http');
var fs = require('fs');
var url = require('url');
var template = require('art-template');

var comments = [
  { message: '评论一，幅度萨芬撒旦发。', date: '2019-01-18' },
  { message: '评论一，幅度萨芬撒旦发。', date: '2019-01-18' },
  { message: '评论一，幅度萨芬撒旦发。', date: '2019-01-18' },
  { message: '评论一，幅度萨芬撒旦发。', date: '2019-01-18' },
  { message: '评论一，幅度萨芬撒旦发。', date: '2019-01-18' }
];

http
  .createServer(function(req, res) {
    var obj = url.parse(req.url, true);
    var pathname = obj.pathname;
    if (pathname === '/') {
      fs.readFile('./html/template.html', function(err, data) {
        if (err) {
          res.end(err);
        } else {
          var htmlStr = template.render(data.toString(), comments);
          res.end(htmlStr);
        }
      });
    } else if (pathname === '/comment') {
      var message = obj.query.message;
      comments.push({ message: message, date: '2019-01-23' });
console.log('object');
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    } else if (pathname === '/post') {
      fs.readFile('./html/post.html', function(err, data) {
        if (err) {
          res.end(err);
        } else {
          res.end(data);
        }
      });
    } else {
      res.end('404');
    }
  })
  .listen(3000, function() {

    console.log('object');
    console.log('服务器启动成功！');
  });

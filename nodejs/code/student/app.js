var express = require('express');
var bodyParser = require('body-parser');
var router = require('./router');

var app = express();

app.engine('html', require('express-art-template'));

app.use('/public/',express.static('./public/'));
app.use('/node_modules/', express.static('./node_modules'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.listen(3000, function() {
  console.log('服务器启动成功！');
});

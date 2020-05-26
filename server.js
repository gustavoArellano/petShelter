var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('./server/config/mongoose.js');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));

require('./server/config/routes.js')(app);

app.listen(8000, function() {});
var express = require('express');
var http = require('http');
var fs = require('fs');
var url = require('url');
var app = express();

http.createServer(app).listen(80);

app.get('/', express.static('index.html');





var express = require('express');
var app = express();
var router = require('./router.js');
app.use(express.urlencoded({
    extended:true
}));
app.use(express.static('static'))
app.use(express.static('static/html'))



app.use(router);
app.listen(60001);
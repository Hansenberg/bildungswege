var express = require('express');
var app = express();
var router = require('./router.js');
app.use(router);
app.use(express.urlencoded({
    extended:true
}));
app.listen(60001);
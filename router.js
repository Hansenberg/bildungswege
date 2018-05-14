var express = require('express');
var router = express.Router();
var index = require('./routes/index.js')
router.get('/', index);
module.exports = router;
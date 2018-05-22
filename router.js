var express = require('express');
var router = express.Router();
var login_submit = require('./routes/login_submit.js');
var register_submit = require('./routes/register_submit.js');
router.post('/login', login_submit);
router.post('/register', register_submit);
module.exports = router;
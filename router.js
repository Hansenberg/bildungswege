var passport = require('passport');
var express = require('express');
var router = express.Router();
var login_submit = require('./routes/login_submit.js');
var register_submit = require('./routes/register_submit.js');
var index = require('./routes/index');
router.get('/', index)
router.post('/login', login_submit);
router.post('/register', register_submit);
router.post('/secret', passport.authenticate('local'), function(req, res){
    res.send(req.user);
})
module.exports = router;
//import necessary modules
var passport = require('passport');
var express = require('express');
//create Router object
var router = express.Router();
//import routes that handle requests
var index = require('./routes/index');
var login = require('./routes/login');
var login_submit = require('./routes/login_submit');
var register = require('./routes/register');
var register_submit = require('./routes/register_submit');
var impressum = require('./routes/impressum');
var about = require('./routes/about');
var datenschutz = require('./routes/datenschutz');
var find = require('./routes/find');
var profile = require('./routes/profile');
var settings = require('./routes/settings');


//set up get routes
router.get('/', index);
router.get('/login', login);
router.get('/register', register);
router.get('/impressum', impressum);
router.get('/about', about);
router.get('/datenschutz', datenschutz);
router.get('/find', find);
router.get('/profile', profile);
router.get('/settings', settings);

//set up post routes
router.post('/login', login_submit);
router.post('/register', register_submit);
router.post('/secret', passport.authenticate('local'), function(req, res){
    res.send(req.user);
})
module.exports = router;
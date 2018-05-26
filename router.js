//import necessary modules
var passport = require('passport');
var express = require('express');
const{check, validationResult} = require('express-validator/check');
//create Router object
var router = express.Router();
//import routes that handle requests
var index = require('./routes/index');
var login = require('./routes/login');
var login_submit = require('./routes/login_submit');
var register = require('./routes/register');
var register_submit = require('./routes/register_submit');
var logout = require('./routes/logout')
var impressum = require('./routes/impressum');
var about = require('./routes/about');
var datenschutz = require('./routes/datenschutz');
var find = require('./routes/find');
var profile = require('./routes/profile');
var settings = require('./routes/settings');
var contact = require('./routes/contact');
var contact_submit = require('./routes/contact_submit');
//set up get routes
router.get('/', index);
router.get('/login', login);
router.get('/register', register);
router.get('/logout', logout)
router.get('/impressum', impressum);
router.get('/about', about);
router.get('/datenschutz', datenschutz);
router.get('/find', find);
router.get('/profile', profile);
router.get('/settings', settings);
router.get('/contact', contact);

//set up post routes
router.post('/login', passport.authenticate('local',  { successRedirect: '/profile', failureRedirect: '/login'}), login_submit);
//validate 
router.post('/register',[

], register_submit);
router.post('/contact',[
    check('name').not().isEmpty().withMessage('Das Feld "Name" darf nicht leer sein.')
    ,
    check('email').isEmail().withMessage('Geben sie eine E-Mail-Adresse an.')
    ,
    check('subject').not().isEmpty().withMessage('Geben sie einen Betreff an.')
    ,
    check('message').not().isEmpty().withMessage('Geben sie eine Nachricht ein.')
], contact_submit);
module.exports = router;
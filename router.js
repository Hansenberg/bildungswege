//import necessary modules
var passport = require('passport');
var express = require('express');
const{check, validationResult} = require('express-validator/check');
var sql_connect = require('./custom_modules/sql_connect');
var sqlcon = new sql_connect();
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
var find_submit = require('./routes/find_submit.js');
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
    check('username').isLength({min: 5, max: 50}).withMessage('Benutzername muss mindestens 5 und maximal 50 Zeichen lang sein')
    ,
    /*
    check('username').custom((value, { req }) => {
        new Promise(doesUserExist(resolve, reject)).then(() => {
              return value;
      })
  })
    ,
    */
    check('email').isEmail().trim().normalizeEmail({all_lowercase: true}).withMessage('Geben sie eine gültige E-Mail-Adresse an.')
    ,
    check('password').isLength({min: 8, max: 50}).withMessage('Passwort muss mindestens 8 Zeichen lang sein.')
    ,
    check('passwordCompare').custom((value,{req, loc, path}) => {
        if (value !== req.body.password) {
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    }).withMessage('Passwörter stimmen nicht überein.')
    ,
    check('first_name').not().isEmpty().withMessage('Geben sie ihren Vornamen an.')
    ,
    check('last_name').not().isEmpty().withMessage('Geben sie ihren Nachnamen an.')
    ,
    check('birth_date').isISO8601().withMessage('Geben sie ihr Datum im Format JJJJ-MM-TT an.')
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
router.post('/find', find_submit)
module.exports = router;

function doesUserExist(resolve, reject){
    sqlcon.connection.query('SELECT * FROM person WHERE benutzername = "'+username+ '";',[resolve, reject], function(err,res,fields){
        if(res[0]){
            reject();
        }else{
            resolve();
        }
    })
}
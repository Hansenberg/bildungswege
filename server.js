var express = require('express');
var app = express();
var router = require('./router.js');
var session = require('express-session');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);
var sql_connect = require('./custom_modules/sql_connect');
var user = require('./models/user');
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var flash = require('express-flash');
sqlcon = new sql_connect();

app.use(express.urlencoded({
    extended:true
}));
//trust first proxy (for nginx)
app.set('trust proxy', 1) 
//setting up myqsl session store
var sessionStoreOptions = {
    host: 'localhost',
    port: 3306,
    user: 'admin',
    password: 'admin',
    database: 'bildungswege'
}
var sessionStore = new MySQLStore(sessionStoreOptions);
//setting up session middleware
var sessionOptions = {
    secret: 'verySecureSecret1337',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie :{
        httpOnly: false,
        secure:false,
        maxAge: 3600000,
        sameSite: true
    }
}
app.use(session(sessionOptions));
//setting up static routes
app.use(express.static('static'));

//setting up passport and local strategy for authentication of users
//TODO: more intricate checking of user
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
var user_db;
sqlcon.connection.query('SELECT * FROM person WHERE benutzername ="'+username + '"', function(err, res, fields){
        if(err){ 
            console.log(err); 
            return done(err, null);
        }
        else{
            deserialize(res, err);
        }
});
var deserialize = function(sqlResult, err){
    done(err, new user(sqlResult[0].benutzername, sqlResult[0].passwort, sqlResult[0].email, sqlResult[0].vorname, sqlResult[0].name, sqlResult[0].geburtsdatum, sqlResult[0].kontotyp));
}

});

passport.use(new LocalStrategy(function(username, password, done){
    sqlcon.connection.query('SELECT passwort FROM person WHERE benutzername = "'+ username + '"', function(err, res, fields){
        if(err){
            throw err;
        }else{
            check_pwd(res);
        }
    });
    check_pwd = function(sqlResult){
        if (!sqlResult[0]){
            return done(null, false)
        }
        var resultPassword = sqlResult[0].passwort;
        bcrypt.compare(password, resultPassword, function(err, res) {
            if(res){
                sqlcon.connection.query('SELECT * FROM person where benutzername = "' + username + '"', function(err, res, fields){
                    if(err) throw err;
                    ret_user(res);
                })
            }else{
                return done(null, false)
            }
        });
    }
    ret_user = function(sqlResult){
        return done(null, new user(sqlResult[0].benutzername, sqlResult[0].passwort, sqlResult[0].email, sqlResult[0].vorname, sqlResult[0].name, sqlResult[0].geburtsdatum, sqlResult[0].kontotyp));
    }
}));



//use flash messages module
app.use(flash());
app.use(function(req, res, next){
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

/* Junkyard 
bcrypt.hash('admin', 10, function(err, hash) {
   console.log(hash);
  });
bcrypt.compare('admin', '$2b$10$ijqf5AuZpQ2UaCQFdcweD.UkHgDDP2QTWkFibSTFPCageoeDjsmRy', function(err, res) {
    console.log(res);
});
*/

app.use(router);
app.listen(60001);
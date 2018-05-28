var pug = require('pug');
var bcrypt = require('bcrypt');
var sql_connect = require('../custom_modules/sql_connect');
var sqlcon = new sql_connect();
const{check, validationResult} = require('express-validator/check');
var main = pug.compileFile('./templates/main.pug',{pretty:true});
var main_auth = pug.compileFile('./templates/main_auth.pug',{pretty:true});
var registerform = pug.compileFile('./templates/registerform.pug',{pretty:true});
var register_success = pug.compileFile('./templates/register_success.pug',{pretty:true});
module.exports = function(req, res){
    errors = validationResult(req);
    //check if form contained errors
    if(!errors.isEmpty()){
        errors = errors.array();
        console.log(errors);
        for(i = 0; i < errors.length; i++){
            req.flash('error', errors[i].msg);
        }
        if(req.user){
            res.send(
                main_auth({content: registerform({errors: req.flash('error')})})
            );
        }else{
            res.send(
                main({content: registerform({errors: req.flash('error')})})
            );
        }
         
    }else{
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var birth_date = req.body.birth_date
        var password_hash;
        bcrypt.hash(password, 10, function(err, hash) {
            if(err) throw err;
            sqlcon.connection.query('INSERT INTO person (benutzername, passwort, vorname, name, email, geburtsdatum, kontotyp) VALUES ("'+username+'", "' + hash +'", "' + first_name + '", "' + last_name + '", "' + email + '", DATE("' + birth_date+'"), "normal");', function(err, res,fields){
                if(err) throw err;
                success()
            } )
        });
        function success(){
            res.send(main({content: register_success()}))
        }
        

    }
}
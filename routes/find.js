var pug = require('pug');
var sql_connect = require('../custom_modules/sql_connect.js');
var sqlcon = new sql_connect();
module.exports = function(req, res){
var main = pug.compileFile('./templates/main.pug', {pretty:true});
var main_auth = pug.compileFile('./templates/main_auth.pug', {pretty:true});
var find = pug.compileFile('./templates/find.pug', {pretty:true});
    
    if (req.user) {
        sqlcon.connection.query('SELECT id, name FROM abschluss', function(err, res, fields){
            if(err) throw err;
            a(res);
        })
        function a(results){
            res.send(main_auth({
                content: find({
                    results: results
                })
            }));
        }

    } else {
        req.flash('error','Sie müssen sich zuerst anmelden.');
        res.redirect('/login');
    }
    
}
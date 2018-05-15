var pug = require('pug');
var sql_connect = require ('../custom_modules/sql_connect');
var connection = new sql_connect();
module.exports = function(req, res){
    res.send(pug.renderFile('templates/index.pug', {
        h1:"Home"
    }));
}

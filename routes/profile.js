var pug = require('pug');
module.exports = function(req, res){
    var fn = pug.compileFile('./templates/main.pug', {pretty:true})
    res.send(fn({
        content:'profile'
    }));
}
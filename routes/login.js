var pug = require('pug');
module.exports = function(req, res){
    var main = pug.compileFile('./templates/main.pug', {pretty:true})
    var loginform = pug.compileFile('./templates/loginform.pug', {pretty: true});
    res.send(main({
        content: loginform()
    }));
}
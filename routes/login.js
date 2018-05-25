var pug = require('pug');
module.exports = function(req, res){
    var main = pug.compileFile('./templates/main.pug', {pretty:true});
    var main_auth = pug.compileFile('./templates/main_auth.pug');
    var loginform = pug.compileFile('./templates/loginform.pug', {pretty: true});
    var content = 'about';
    if (req.user) {
        res.redirect('/profile');
    } else {
        res.send(main({
            content: loginform()
        }));
    }
}
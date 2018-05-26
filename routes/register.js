var pug = require('pug');
module.exports = function(req, res){
    var main = pug.compileFile('./templates/main.pug', {pretty:true});
    var main_auth = pug.compileFile('./templates/main_auth.pug', {pretty:true});
    var registerform = pug.compileFile('./templates/registerform.pug', {pretty:true});
    var content = 'register';
    if (req.user) {
        res.redirect('/profile');
    } else {
        res.send(main({
            content: registerform({errors: null})
        }));
    }
    
}
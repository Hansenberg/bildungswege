var pug = require('pug');
module.exports = function(req, res){
    var main = pug.compileFile('./templates/main.pug', {pretty:true});
    var main_auth = pug.compileFile('./templates/main_auth.pug');
    var content = 'register';
    if (req.user) {
        res.redirect('/profile');
    } else {
        res.send(main({
            content: content
        }));
    }
    
}
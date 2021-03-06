var pug = require('pug');
module.exports = function(req, res){
    var main = pug.compileFile('./templates/main.pug', {pretty:true});
    var main_auth = pug.compileFile('./templates/main_auth.pug');
    var impressum = pug.compileFile('./templates/impressum.pug', {pretty:true});
    if (req.user) {
        res.send(main_auth({
            content: impressum()
        }));
    } else {
        res.send(main({
            content: impressum()
        }));
    }
    
}
var pug = require('pug');
module.exports = function(req, res){
    var main = pug.compileFile('./templates/main.pug', {pretty:true});
    var main_auth = pug.compileFile('./templates/main_auth.pug');
    var content = 'settings';
    if (req.user) {
        res.send(main_auth({
            content: content
        }));
    } else {
        res.send(main({
            content: content
        }));
    }
    
}
var pug = require('pug');
module.exports = function(req, res){
    var main = pug.compileFile('./templates/main.pug', {pretty:true});
    var main_auth = pug.compileFile('./templates/main_auth.pug',{pretty:true});
    var datenschutz = pug.compileFile('./templates/datenschutz.pug', {pretty:true});
    if (req.user) {
        res.send(main_auth({
            content: datenschutz()
        }));
    } else {
        res.send(main({
            content: datenschutz()
        }));
    }
    
}
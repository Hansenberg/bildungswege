var pug = require('pug');
module.exports = function(req, res){
    var main = pug.compileFile('./templates/main.pug', {pretty:true});
    var main_auth = pug.compileFile('./templates/main_auth.pug', {pretty:true});
    var about = pug.compileFile('./templates/about.pug', {pretty: true})
    if (req.user) {
        res.send(main_auth({
            content: about()
        }));
    } else {
        res.send(main({
            content: about()
        }));
    }
    
}
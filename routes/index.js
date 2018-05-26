var pug = require('pug');
module.exports = function(req, res){
    var main = pug.compileFile('./templates/main.pug', {pretty:true});
    var main_auth = pug.compileFile('./templates/main_auth.pug');
    var index_jumbotron = pug.compileFile('./templates/index_jumbotron.pug');
    if (req.user) {
        res.send(main_auth({
            content: index_jumbotron()
        }));
    } else {
        res.send(main({
            content: index_jumbotron()
        }));
    }
    
}
var pug = require('pug');
module.exports = function(req, res){
    var main = pug.compileFile('./templates/main.pug', {pretty:true});
    var main_auth = pug.compileFile('./templates/main_auth.pug', {pretty:true});
    var find = pug.compileFile('./templates/find.pug', {pretty:true});
    
    if (req.user) {

        res.send(main({
            content: find({
                
            })
        }));
    } else {
        res.redirect('/login');
    }
    
}
var pug = require('pug');
module.exports = function(req, res){
    var main = pug.compileFile('./templates/main.pug', {pretty:true});
    var main_auth = pug.compileFile('./templates/main_auth.pug', {pretty:true});
    var contact = pug.compileFile('./templates/contact.pug', {pretty:true});
    if (req.user) {
        res.send(main_auth({
            content: contact()
        }))
    } else {
        res.send(main({
            content: contact()
        }));
    }
    
}
var pug = require('pug');
module.exports = function(req, res){
    res.send(pug.renderFile('templates/index.pug', {
        h1:"Home"
    }));
}

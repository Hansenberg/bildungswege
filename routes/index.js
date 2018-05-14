var pug = require('./node_modules/pug/packages/pug');
module.exports = function(req, res){
    res.send(pug.renderFile('templates/index.pug', {
        h1:"Home"
    }));
}
module.exports = function(req, res){
    var password = req.body.password;
    res.send("ERROR: Dachten sie etwa, wir sind schon so weit? Hier haben sie ihr Passwort im Klartext zurück: " + password);
}
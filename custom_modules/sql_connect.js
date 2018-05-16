var mysql = require('mysql');
module.exports = function (){
    var connection = mysql.createConnection({
        host : 'localhost',
        user : 'admin',
        password : 'admin',
        db : 'bildungswege'
    })
    connection.connect(function(err){
        if(err) {
            console.log('Failed to connect to database.');
            throw err;
        }
        else{
            console.log("Successfully connected to database.");
        }
    })
    connection.query("USE bildungswege;", function(err, res, fields){
        if(err) {
            console.log("USE bildungswege; query failed.");
            throw err;
        }
        else{
            console.log("Successfully using bildungswege");
        }
    })  
    this.connection = connection;
}

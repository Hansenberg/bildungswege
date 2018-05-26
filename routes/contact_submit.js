var nodemailer = require('nodemailer');
var flash = require('express-flash')
var pug = require('pug');

var main = pug.compileFile('./templates/main.pug', {pretty:true});
var main_auth = pug.compileFile('./templates/main_auth.pug', {pretty:true});
var contact = pug.compileFile('./templates/contact.pug', {pretty:true});
var contact_success = pug.compileFile('./templates/contact_success.pug', {pretty:true});
const{check, validationResult} = require('express-validator/check');

module.exports = function(req, res){
    var errors = validationResult(req);
    //check if errors exist in post request. if true, errors will be flashed. if not, mail will be sent.
    if(!errors.isEmpty()){
        errors = errors.array();
        var errorMessages  = [];
        for(i =0; i < errors.length; i++){
            errorMessages[i] = errors[i].msg
            req.flash('error', errorMessages[i]);   
        }
        if(req.user){
            res.send(main_auth({content: contact({errors: req.flash('error')})}));
        }else{
            res.send(main({content: contact({errors: req.flash('error')})}));
        }

    }
    else{
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bildungswege123@gmail.com',
            pass: 'ThisIsNotThePassword'
        }
    });
    var mailOptions = {
        from: 'bildungswege123@gmail.com',
        to: 'bildungswege123@gmail.com',
        subject: subject,
        text: 'Nachricht von: ' + email + '\nName: ' + name +'\nNachricht:\n' + message
      };
    transporter.sendMail(mailOptions, function(err, info){
        if(err) throw err;
        console.log('mail sent');
    });
    
    if(req.user){
        res.send(
            main_auth({
                content: contact_success()
            })
        );
        
    }else{
        res.send(main({
            content: contact_success()
        }));
    }
    }
}
var nodemailer = require('nodemailer');
var pug = require('pug');
    module.exports = function(req, res){
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
    
    var main = pug.compileFile('./templates/main.pug', {pretty:true});
    var main_auth = pug.compileFile('./templates/main_auth.pug', {pretty:true});
    var contact_success = pug.compileFile('./templates/contact_success.pug', {pretty:true});

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
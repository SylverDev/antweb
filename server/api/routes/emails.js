module.exports = function(app) {
    'use strict';
    var nodemailer = require('nodemailer');
    var userInfos = {
        user: "veronsyl@wanadoo.fr",
        pass: 'ptqctky'
    };
    /*
      Configure userInfos
      Post an object to /api/sendEmail
        Must contain : Name (name), Email (email) & Message (msg)
    */
    var transport = nodemailer.createTransport({
        host: "smtp.orange.fr",
        port: 465,
        secure: true,
        auth: {
            user: userInfos.user,
            pass: userInfos.pass
        }
    });
    //	transport.on('log', console.log);
    var header = '<table style="width:70%; margin-left: 15%;">' +
        '<thead align="center">' +
        '<tr align="center" style="background-color:#64737c;width:100%;heigth:60px;padding-top: 5px;color:#fff;">' +
        '<td colspan="4" style="padding-top:10px;">MESSAGE</td>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr>';

    var footer = '</tr>' +
        '<tr align="center" style="background-color:#64737c;width:100%;heigth:60px;padding-top: 5px;color:#fff;margin-top:100px;">' +
        '<td colspan="4" style="padding-top:10px;">&copy; 2017 - AntWeb </td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '<table style="width:70%; margin-left: 15%;text-align:center;">' +
        '<tr style="padding-top:5px;">' +
        '</tr>' +
        '</table>';

    var send = function(mailOptions) {
        transport.sendMail(mailOptions, function(err, info) {
            if (err)
                console.log(err);
            transport.close();
        });
    };

    app.post('/sendEmail', function(req, res) {

        var htmlContent =
            header +
            '<td style="padding-top:15px;padding-left:10px;"><p>Name: <b>' + req.body.name + '</b>,</p></td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding-top:15px;padding-left:10px;"><p>Email: <b>' + req.body.email + '</b>,</p></td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding-top:15px;padding-left:10px;"><p>Tel: <b>' + req.body.tel + '</b>,</p></td>' +
            '</tr>' +
            '<tr>' +
            '<td align="left" style="padding-top:15px;padding-left:10px;"><p>' + req.body.msg + '</p></td>' +
            '</tr>' +
            '</tr>' +
            footer;

        send({
            from:  req.body.email,
            subject: 'Formulaire de contact site AntWeb',
            to: userInfos.user,
            sender: 'mailer <' + userInfos.user + '>',
            html: htmlContent
        });
        res.sendStatus(200);


    });

};

/**** 邮件 ***/
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
//  邮件
var transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
      user: '2994179953@qq.com',
      // 这里密码不是qq密码，是你设置的smtp授权码
      pass: 'vpuomdhkbqlqdddj',
    }
});
router.post('/Emailpost', function (req, res) {
    if(req.body){
        var mailOptions = {
            from: '"啊死吧" <2994179953@qq.com>', // sender address
            to: req.body.site, // list of receivers
            subject: req.body.name, // Subject line
            // 发送text或者html格式
            // text: 'Hello world?', // plain text body
            text: req.body.content // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            res.send({success:true})
        });
    }
    
})
module.exports = router;

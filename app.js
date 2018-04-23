var express = require('express');
var path = require('path');
var app = express();
// var ueditor = require('ueditor');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.all('/private/from',function(req,res){
  console.log(1111,2222,3333)
  res.cookie('monster', 'nomnom');
  res.send('obj')
})
// app.use('/api/ue', ueditor(path.join(__dirname, 'public'), function (req, res, next) {
//   console.log(req.body)
//   res.cookie('monster', 'nomnom');
//   if(req.query.action === 'uploadimage') {
//     var foo = req.ueditor;
//     var imgname = req.ueditor.filename;
//     var img_url = '/ueditor/images/';
//     res.ue_up(img_url);
//     res.setHeader('Content-Type', 'text/html');
//   } else if (req.query.action === 'listimage') {
//     var dir_url = '/ueditor/images/';
//       res.ue_list(dir_url);
//   } else {
//      console.log('config.json');
//      res.setHeader('Content-Type', 'application/json');
//      res.redirect('/ueditor/nodejs/config.json')
//   }

// }))
app.listen(3300,console.log([
    "                   _ooOoo_",
    "                  o8888888o",
    "                  88\" . \"88",
    "                  (| -_- |)",
    "                  O\\  =  /O",
    "               ____/`---'\\____",
    "             .'  \\\\|     |//  `.",
    "            /  \\\\|||  :  |||//  \\",
    "           /  _||||| -:- |||||-  \\",
    "           |   | \\\\\\  -  /// |   |",
    "           | \\_|  ''\\---/''  |   |",
    "           \\  .-\\__  `-`  ___/-. /",
    "         ___`. .'  /--.--\\  `. . __",
    "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
    "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
    "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
    "======`-.____`-.___\\_____/___.-`____.-'======",
    "                   `=---='",
    "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
    "         佛祖保佑       永无BUG"
].join('\n')));
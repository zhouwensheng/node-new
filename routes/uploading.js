/**** 上传 ***/
var express = require('express');
var router = express.Router();
var multer  = require('multer');
var fs = require('fs');
var path = require('path');
// var upload = multer({ dest: 'public/' })
var mysql = require('mysql');
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
       destination: function (req, file, cb) {
           cb(null, './public/uploads')
      }, 
    //给上传文件重命名，获取添加后缀名
     filename: function (req, file, cb) {
         var fileFormat = (file.originalname).split(".");
         cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
     }
});  
var connection = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: 'MyNewPass4!',
    // port: '3306',
    // database: 'run111',
    host: 'localhost',
    user: 'root',
    password: '931017Zhouws',
    port: '3306',
    database: 'run111',
});
connection.connect();
var upload = multer({
    storage : storage
})
router.post('/pictureing', upload.single('goning'), function (req, res, next) {
    console.log(434343)
    var filename = 'public/user/' + req.session.name + '.txt';
    var dataname = {'uploadPublic':req.file.filename};
    fs.readFile(filename, 'utf-8', function(err, data) {
        if (err) {
            throw err;
        }
        var sudata = JSON.parse(data);
        if(!sudata.uploadPublic){
            sudata.uploadPublic=req.file.filename;
        }else{
            sudata.uploadPublic=sudata.uploadPublic+';'+req.file.filename;
        }
        
        fs.writeFile(filename, JSON.stringify(sudata), function(err) {
            if (err) {
                throw err;
            }
            res.send({success:true,data:req.file})
        })        
    });         
    // fs.readFile('./test.txt', 'utf8', function(err, data){
    //     if(err){

    //     }
    //     console.log(data);  
    // });
    // console.log(typeof req.file)
    // console.log(req.file.filename)
    // res.send({success:true,data:req.file})
})
module.exports = router;
 

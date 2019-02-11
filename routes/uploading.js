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
var fileFilterPicture= function (req, file, cb) {
    var typeArray = file.mimetype.split('/');
    var fileType = typeArray[1];
    if (fileType == 'jpeg' || fileType == 'png') {
        cb(null, true);
    } else {
        cb(null, false)
    } 
}
var fileFilterMUsic= function (req, file, cb) {
    var typeArray = file.mimetype.split('/');
    var fileType = typeArray[1];
    if (fileType == 'mp3') {
        cb(null, true);
    } else {
        cb(null, false)
    } 
}
var fileFilterVideo= function (req, file, cb) {
    var typeArray = file.mimetype.split('/');
    var fileType = typeArray[1];
    if (fileType == 'mp4') {
        cb(null, true);
    } else {
        cb(null, false)
    } 
}
var fileFilterTxt= function (req, file, cb) {
    var typeArray = file.mimetype.split('/');
    var fileType = typeArray[1];
    if (fileType == 'plain') {
        cb(null, true);
    } else {
        cb(null, false)
    } 
}
var uploadPublic = multer({
    storage : storage,
    fileFilter : fileFilterPicture,
    limits : {
        fileSize :1024 * 1024 * 4
    }
})
var uploadMusic = multer({
    storage : storage,
    fileFilter : fileFilterMUsic,
    limits : {
        fileSize : 1024 *1024 * 20
    }
})
var uploadVideo = multer({
    storage : storage,
    fileFilter : fileFilterVideo,
    limits : {
        fileSize : 1024 *1024 * 100
    }
})
var uploadTxt = multer({
    storage : storage,
    fileFilter : fileFilterTxt,
    limits : {
        fileSize : 1024 *1024 * 10
    }
})
// 上传图片
router.post('/pictureing', uploadPublic.single('goning'), function (req, res, next) {
    if(req.file.mimetype=='image/jpeg' || req.file.mimetype=='image/png'){
        var filename = 'public/user/' + req.session.name + '.txt';
        fs.readFile(filename, 'utf-8', function(err, data) {
            if (err) {
                throw err;
            }
            var sudata = JSON.parse(data);
            sudata.uploadPublic.push(req.file.filename);
            fs.writeFile(filename, JSON.stringify(sudata), function(err) {
                if (err) {
                    throw err;
                }
                res.send({success:true,data:req.file})
            })        
        });
    }else{
        res.send({success:false,data:req.file})
    }             
})
// 上传音乐
router.post('/musicing', uploadMusic.single('goning'), function (req, res, next) {
    if(req.file.mimetype=='audio/mp3'){
        var filename = 'public/user/' + req.session.name + '.txt';
        fs.readFile(filename, 'utf-8', function(err, data) {
            if (err) {
                throw err;
            }
            var sudata = JSON.parse(data);
            sudata.uploadMusic.push(req.file.filename);
            fs.writeFile(filename, JSON.stringify(sudata), function(err) {
                if (err) {
                    throw err;
                }
                res.send({success:true,data:req.file})
            })        
        });
    }else{
        res.send({success:false,data:req.file})
    }
             
})
// 上传视频
router.post('/videoing', uploadVideo.single('goning'), function (req, res, next) {
    if(req.file.mimetype=='video/mp4'){
        var filename = 'public/user/' + req.session.name + '.txt';
        fs.readFile(filename, 'utf-8', function(err, data) {
            if (err) {
                throw err;
            }
            var sudata = JSON.parse(data);
            sudata.uploadVideo.push(req.file.filename);
            fs.writeFile(filename, JSON.stringify(sudata), function(err) {
                if (err) {
                    throw err;
                }
                res.send({success:true,data:req.file})
            })        
        });
    }else{
        res.send({success:false,data:req.file})
    }          
})
// 上传txt文件
router.post('/txting', uploadTxt.single('goning'), function (req, res, next) {
    console.log(req.file.mimetype)
    if(req.file.mimetype=='text/plain'){
        var filename = 'public/user/' + req.session.name + '.txt';
        fs.readFile(filename, 'utf-8', function(err, data) {
            if (err) {
                throw err;
            }
            var sudata = JSON.parse(data);
            sudata.uploadTxt.push(req.file.filename);
            fs.writeFile(filename, JSON.stringify(sudata), function(err) {
                if (err) {
                    throw err;
                }
                res.send({success:true,data:req.file})
            })        
        });
    }else{
        res.send({success:false,data:req.file})
    }          
})
router.post('/removepicture', function(req,res,next){
    var filename = 'public/user/' + req.session.name + '.txt';
    if(req.body.removeName){
        fs.readFile(filename,'utf-8',function(err,data){
            if(err){
                throw err;
            }
            var sudata = JSON.parse(data); 
            var suarrtyLength = sudata.uploadPublic.length;
            var i = 0;
            for(;i<suarrtyLength;i++){
                if(req.body.removeName == sudata.uploadPublic[i]){
                    sudata.uploadPublic.splice(i,1)
                    break;
                }
            }
            fs.writeFile(filename, JSON.stringify(sudata), function(err) {
                if (err) {
                    throw err;
                }
                res.send({success:true})
            })     
        })
    }
    

})
module.exports = router;
 

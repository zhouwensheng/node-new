// 好友
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MyNewPass4!',
    port: '3306',
    database: 'run111',

    // host: 'localhost',
    // user: 'root',
    // password: '931017Zhouws',
    // port: '3306',
    // database: 'run111',
})
connection.connect();
router.post('/add', function (req, res){
    var sql = 'SELECT * FROM user';
    connection.query(sql, function(err, result){
        if(err){
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        result.forEach((val) => {
            if (req.body.id == val.id) {
                var arrays = [];
                if(val.mailbox){
                    arrays = JSON.parse(val.mailbox)
                    arrays.push(req.body.Fid)
                }else{
                    arrays.push(req.body.Fid);
                }
                var sqls = 'UPDATE user SET mailbox = ?';
                var modSqlParams = [JSON.stringify(arrays)];
                connection.query(sqls,modSqlParams,function (err,result) {
                    if(err){
                      console.log('error');
                      return;
                    }
                    res.send({ success: true })
                })
            }
        })
        
        res.send({ msg: false })   
    })
})
router.post('/delete', function (req, res){
    var sql = 'SELECT * FROM user';
    connection.query(sql, function(err, result){
        if(err){
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        var obj = {};
        result.forEach((val) => {
            if (req.body.id == val.id) {
                var arrays = JSON.parse(val.mailbox);
                var num;
                arrays.forEach((vals,index) => {
                    if(vals == val.Fid){
                        num = index;
                    }
                })
                arrays.splice(num,1);
                val.mailbox = JSON.stringify(arrays)
            }
        })
        res.send({ success: true })
    })
})
router.post('/inquire', function (req, res){
    var sql = 'SELECT * FROM user';
    connection.query(sql, function(err, result){
        if(err){
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        var obj = {
            data:[],
            success: true
        };
        var arrays;
        result.forEach((val) => {
            if (req.body.id == val.id) {
                if(val.mailbox){
                    arrays = JSON.parse(val.mailbox)
                }
            }
        })
        if(arrays){
            arrays.forEach((val) => {
                result.forEach((vals) => {
                    if(vals.id == val){
                        obj.data.push(vals)
                    }
                })
            })
        }
        res.send(obj)
    })
})
router.post('/search', function (req, res){
    var sql = 'SELECT * FROM user';
    connection.query(sql, function(err, result){
        if(err){
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        var obj = {
            success: true
        };
        result.forEach((val) => {
            if (req.body.name == val.name && req.body.id != val.id) {
                obj.data = val;
            }
        })
        res.send(obj)
    })
})

module.exports = router;
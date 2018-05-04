/**** 登陆注册 ***/
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '931017Zhouws',
    port: '3306',
    database: 'run111',
  });
connection.connect();
// 登陆
router.post('/from', function (req, res) {
    var sql = 'SELECT * FROM user';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        var loty = true;
        var obj = {};
        result.forEach((val) => {
            if (req.body.name == val.name && req.body.password == val.password) {
                loty = false;
                obj.data = val;
                obj.success = true;
            }
        })
        if (loty) {
            res.send({ success: '账号或密码错误' });
        } else {
            req.session.name = req.body.name; // 登录成功，设置 session
            res.send(obj)
        }
    })
})
// 注册
router.post('/register', function (req, res) {
    return;
    var sql = 'SELECT * FROM user';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        var loty = true;
        result.forEach((val) => {
            if (req.body.name != val.name) {
                loty = false;
            }
        })
        if (loty) {
            res.send({ success: false });
        } else {
            var addSql = 'INSERT INTO user(id,password,name,phone,mailbox,gender) VALUES(?,?,?,?,?,?)';
            var addSqlParams = [result.length + 1, req.body.password, req.body.name, req.body.phone, req.body.mailbox, req.body.gender];
            connection.query(addSql, addSqlParams, function (err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    return;
                }
                res.send({ success: true })
            });

        }
    })
})
//检测登陆
router.post('/login', function (req, res) {
    if (req.session.name) {
        res.send(JSON.stringify({ success: true }))
    } else {
        res.send(JSON.stringify({ success: false }))
    }
})

module.exports = router;

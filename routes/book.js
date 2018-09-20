// 电子书
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
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
})
connection.connect();
router.post('/catalogue', function (req, res){
    var sql = 'SELECT * FROM cataloguebook';
    connection.query(sql, function(err, result){
        if(err){
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.send({success:true,data:result})
    })
})
module.exports = router;
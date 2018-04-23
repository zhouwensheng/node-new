/*图片数据*/
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
// 获取图片瀑布流数据
router.post('/falls', function (req, res) {
    var sql = 'SELECT * FROM picture';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.json(result);
    })
})

module.exports = router;
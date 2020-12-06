// 测试用的node.js服务器
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
const {
    send
} = require('process');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
var url = __dirname.substring(0, __dirname.length - 3);
app.use(express.static(url));
/**
 * 
 * 函数功能：生成一个以左右端点为界的随机小数
 * 
 * @param {number} l 左端点
 * @param {number} r 右端点
 * @returns {number} 返回生成的随机数
 * @author 60rzvvbj
 */
function getDoubleRandom(l, r) {
    return l + Math.random() * (r - l + 1);
}

/**
 * 
 * 函数功能：生成一个以左右端点为界的随机整数
 * 
 * @param {number} l 左端点
 * @param {number} r 右端点
 * @returns {number} 返回生成的随机数
 * @author 60rzvvbj
 */
function getIntRandom(l, r) {
    return parseInt(getDoubleRandom(l, r));
}
var template = {
    id: "@id()",
    username: "@cname()",
    email: "@email()"
}
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('C:\\Users\\Lenovo\\Desktop\\lsjs'));

app.post('/shaobing/io/upload', function (req, res) {
    var text = req.body;
    console.log(text);
    res.send({
        flag: 1,
        message: '提交成功'
    });
});
app.listen(8848);
console.log('服务器已启动 端口号8848');
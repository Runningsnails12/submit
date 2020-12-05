﻿
// 设置文本不可被选中
var tool = new Tool(document, window);
tool.textProhibition();

var main = getDom('.main'); // 获取主盒子
var input = main.getDom('input'); // 选择文件的按钮
var select = main.getDom('.selectBox'); // 选择文件的显示框
var submit = main.getDom('.submit'); // 提交按钮
var bgi = getDom('.bgi'); // 背景图盒子
var bgiIndex = 1; // 当前背景图的下标
var cycleRange = 2; // 老板
var nowFile;

// 重置选择文件的框
function selectReset() {
    select.removeClass('select');
    select.innerText = '选择文件';
    var span = document.createElement('span');
    span.innerText = '＋';
    select.appendChild(span);
    select.title = '';
}

// 文件改变函数
function inputChangeFunction() {
    var file = input.files[0];
    if (!file) {
        return;
    }
    if (!judge(file.name)) {
        alert('文件名格式不正确！');
        return;
    }
    nowFile = file;
    select.innerText = file.name;
    select.title = file.name;
    select.addClass('select');
}

// 判断文件名是否满足格式
function judge(str) {
    // 老板
    return true;
}

// 添加选择文件事件
input.addEventListener('change', inputChangeFunction);

// 提交函数
function upload() {
    if (nowFile) {
        var formdata = new FormData();
        formdata.append('file', nowFile);
        ajax({
            type: 'post',
            url: 'shaobing/io/upload',
            data: formdata,
            success: function (res) {
                if (res.flag == 1) {
                    alert('提交成功！');
                } else {
                    alert(res.message);
                }
                submit.state = true;
            }
        }, true);
    } else {
        alert('请先选择文件！');
    }
}

// 提交按钮初始化节流阀
submit.state = true;

// 添加提交事件
submit.addEventListener('click', function () {
    if (submit.state) {
        submit.state = false;
        upload();
    }
});

// 主盒子相关动画
submit.addEventListener('mouseover', function () {
    main.style.transform = 'translate(-45%, -50%)';
    input.style.pointerEvents = 'none';
});
main.addEventListener('mouseout', function () {
    main.style.transform = 'translate(-50%, -50%)';
    select.style.width = '230px';
    select.style.paddingRight = '0px';
    submit.style.pointerEvents = 'auto';
    input.style.pointerEvents = 'auto';
});
input.addEventListener('mouseover', function () {
    main.style.transform = 'translate(-55%, -50%)';
    select.style.width = '360px';
    select.style.paddingRight = '50px';
    submit.style.pointerEvents = 'none';
});

// 初始化背景图
for (var i = 1; i <= cycleRange; i++) {
    var div = document.createElement('div');
    div.style.backgroundImage = 'url(img/bg' + i + '.jpg)';
    div.style.opacity = 0;
    bgi.appendChild(div);
}

// 显示第一张
bgi.children[0].style.opacity = 1;

// 切换背景图
function changeBGI() {
    bgi.children[bgiIndex - 1].style.opacity = 0;
    bgiIndex = bgiIndex + 1 > cycleRange ? 1 : bgiIndex + 1;
    bgi.children[bgiIndex - 1].style.opacity = 1;
}

// 切换背景图的定时器
setInterval(function () {
    changeBGI();
}, 8000);

// 看板娘
// L2Dwidget.init({
//     "display": {
//         "superSample": 2,
//         "width": 200,
//         "height": 400,
//         "position": "right",
//         "hOffset": 0,
//         "vOffset": 0
//     }
// });
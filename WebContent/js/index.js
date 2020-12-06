﻿// 设置文本不可被选中
var tool = new Tool(document, window);
tool.textProhibition();

var main = getDom('.main'); // 获取主盒子
var input = main.getDom('input'); // 选择文件的按钮
var select = main.getDom('.selectBox'); // 选择文件的显示框
var submit = main.getDom('.submit'); // 提交按钮

var nowFile;
var initialFileList = input.files;
var nowFileList = initialFileList;

// 重置选择文件的框
function selectReset() {
    select.removeClass('select');
    select.innerText = '选择文件';
    var span = document.createElement('span');
    span.innerText = '＋';
    select.appendChild(span);
    select.title = '';
    nowFile = null;
    input.files = initialFileList;
}

// 文件改变函数
function inputChangeFunction() {
    var file = input.files[0];
    if (!file) {
        return;
    }
    if (!judge(file.name)) {
        input.files = nowFileList;
        return;
    }
    nowFile = file;
    nowFileList = input.files;
    select.innerText = file.name;
    select.title = file.name;
    select.addClass('select');
}

// 判断文件名是否满足格式
function judge(str) {
    if (str.length > 18 || str.length < 16) {
        subitFalse('文件名不正确');
        return false;
    } else {
        var temp = str.toLowerCase().split('.').splice(-1);
        if (temp[0] != "doc" && temp[0] != "docx") {
            subitFalse('文件名类型不正确');
            return false;
        } else if (str.substring(0, 7) != "1915431" || str.substring(9, 10) != "_") {
            subitFalse('文件名命名不正确');
            return false;
        }
    }
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
            url: '/shaobing/io/upload',
            data: formdata,
            success: function (res) {
                if (res.flag == 1) {
                    submitTrue();
                } else {
                    subitFalse(res.message);
                    // alert(res.message);
                }
                submit.state = true;
                selectReset();
            },
            progress: function (e) {
                // 文件上传进度函数
            }
        });
    } else {
        subitFalse('请先选择文件');
        submit.state = true;
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

// 半透明挡板
var transparentPlate = getDom('.transparentPlate');

// 提交结果提示框相关

var submitTips = getDom('.submitTips'); // 提交结果提示框盒子
var submitTipsPhoto = submitTips.getDom('.photo'); // 图片盒子
var submitTipsText = submitTips.getDom('.tipsText'); // 提示文本那盒子
var submitTipsYes = submitTips.getDom('.yes'); // 确定按钮
submitTips.state = false;

// 关闭提示框函数
function closeTips() {
    submitTips.hide();
    transparentPlate.hide();
    submitTips.state = false;
}

// 确定按钮点击事件
submitTipsYes.addEventListener('click', closeTips);

// 回车确定
document.addEventListener('keydown', function (e) {
    if (submitTips.state && e.key == 'Enter') {
        closeTips();
    }
});

// 提交成功函数
function submitTrue() {
    transparentPlate.show();
    submitTipsPhoto.style.backgroundImage = 'url(img/submitTrue.png)';
    submitTipsText.innerText = '提交成功';
    submitTips.show();
    submitTips.state = true;
}

// 提交失败函数
function subitFalse(str) {
    transparentPlate.show();
    submitTipsPhoto.style.backgroundImage = 'url(img/submitFalse.png)';
    submitTipsText.innerText = str ? str : '提交失败';
    submitTips.show();
    submitTips.state = true;
}

// 背景相关

var bgi = getDom('.bgi'); // 背景图盒子
var dialogBox = bgi.getDom('.dialogBox'); // 对话框盒子
var cycleRange = 2; // 老板

var bgiOptions = [[{
    type: 0, // 直角位置的参数，0 左上，1右上，2左下，3右下，-1隐藏
    top: '0px', // top值
    left: '0px', // left值
    text: '王老板牛逼' // 文案
}, {
    type: 0, // 直角位置的参数，0 左上，1右上，2左下，3右下，-1隐藏
    top: '0px', // top值
    left: '0px', // left值
    text: '王老板贼牛逼' // 文案
    // 数组中第0个元素为模板不用删掉
}], [{
    type: 2,
    top: '430px',
    left: '1024px',
    text: '今天吃什么呢！？'
}, {
    type: 0,
    top: '500px',
    left: '1024px',
    text: '不吃了！'
}], [{
    type: 1,
    top: '430px',
    left: '1156px',
    text: '不想学了'
}]];

// 初始化背景图
for (var i = 1; i <= cycleRange; i++) {
    var div = document.createElement('div');
    div.addClass('photo');
    div.style.backgroundImage = 'url(img/bg' + i + '.jpg)';
    div.style.opacity = 0;
    bgi.appendChild(div);
}

var bgiIndex = 1; // 当前背景图的下标
function changeDialog() {
    for (var i = 0; i < bgiOptions[bgiIndex].length; i++) {
        var type = bgiOptions[bgiIndex][i].type;
        var dialog = document.createElement('div');
        dialog.addClass('dialog');
        dialog.style.borderRadius = '28px';
        dialog.hide();
        if (type == -1) {
            continue;
        } else if (type == 0) {
            dialog.style.borderTopLeftRadius = '0px';
        } else if (type == 1) {
            dialog.style.borderTopRightRadius = '0px';
        } else if (type == 2) {
            dialog.style.borderBottomLeftRadius = '0px';
        } else if (type == 3) {
            dialog.style.borderBottomRightRadius = '0px';
        } else {
            alert('配置出错！');
        }
        dialog.style.top = bgiOptions[bgiIndex][i].top;
        dialog.style.left = bgiOptions[bgiIndex][i].left;
        dialog.innerText = bgiOptions[bgiIndex][i].text;
        dialog.show();
        dialogBox.appendChild(dialog);
    }
}

// 显示第一张
bgi.children[bgiIndex].style.opacity = 1;
changeDialog();

// 切换背景图
function changeBGI() {
    bgi.children[bgiIndex].style.opacity = 0;
    bgiIndex = bgiIndex + 1 > cycleRange ? 1 : bgiIndex + 1;
    bgi.children[bgiIndex].style.opacity = 1;
    dialogBox.removeAllChild();
    setTimeout(function () {
        changeDialog();
    }, 800);
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

// 封锁devtool事件
var admin = false;
var adminPassword = '1234Qwer';
var nowP = 0;

// 解锁
document.addEventListener('keydown', function (e) {
    if (e.key == 'Shift' || e.key == 'Ctrl' || e.key == 'Alt') {
        return;
    }
    if (e.key == adminPassword[nowP]) {
        nowP++;
        if (nowP == adminPassword.length) {
            unlock();
        }
    } else {
        nowP = 0;
    }
});

// 解锁函数
function unlock() {
    if (admin) {
        return;
    }
    admin = true;
    alert('控制台权限已打开！');
}

// 键盘相关快捷键
document.addEventListener('keydown', function (e) {
    if (admin) {
        return;
    }
    if (e.key == 'u' && e.ctrlKey) {
        e.preventDefault();
    } else if (e.key == 'I' && e.ctrlKey && e.shiftKey) {
        console.log(1);
        e.preventDefault();
    } else if (e.key == 's' && e.ctrlKey) {
        e.preventDefault();
    } else if (e.key == 'F12') {
        e.preventDefault();
    }
});

// 鼠标右键
document.addEventListener('contextmenu', function (e) {
    if (admin) {
        return;
    }
    e.preventDefault();
});

// 如果devtoor还是被打开了，就无限debugger
function check() {
    if (admin) {
        return;
    }
    function doCheck(a) {
        if (("" + a / a)["length"] !== 1 || a % 20 === 0) {
            (function () { }
            ["constructor"]("debugger")())
        } else {
            (function () { }
            ["constructor"]("debugger")())
        }
        doCheck(++a)
    }
    try {
        doCheck(0)
    } catch (err) { }
};

var debuggerTimer = setInterval(function () {
    check();
}, 4000);

check();
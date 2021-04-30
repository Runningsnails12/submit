//#region 
// 设置参数

// 交作业的科目(javaweb,多媒体,计组,javaee,python,计网,Oracle)
let subject = 'python';

let cycleRange = 2; // 背景图总个数

let dialogBorderRadius = '100vw'; // 对话框默认圆角大小板

let bgiIndex = 1; // 背景图的初始下标

let rotation = true; // 是否轮播

let adminState = false; // 是否开启控制台锁

let adminPassword = '1234Qwer'; // 控制台密码

let ddl = new Date('2021/4/29 22:00:00'); // 截止日期(格式：yyyy/mm/dd hh:mm:ss)

// 背景图片对话框配置对象
let bgiOptions = [
    [{
        type: 0, // 直角位置的参数，0 左上，1右上，2左下，3右下，-1隐藏
        top_bottom: '0px', // top值
        left_right: '0px', // left值
        text: '王老板牛逼', // 文案
        bgc: '#fff' // 背景颜色
    },
    {
        type: 0, // 直角位置的参数，0 左上，1右上，2左下，3右下，-1隐藏
        top_bottom: '0px', // top值
        left_right: '0px', // left值
        text: '王老板贼牛逼', // 文案
        bgc: 'rgba(0, 0, 0, 0.5)' // 背景颜色
        // 数组中第0个元素为模板不用删掉
    }
    ],
    [{
        type: 1,
        top_bottom: '29%',
        left_right: '66%',
        text: '你来交作业了吗？'
    }],
    [{
        type: 1,
        top_bottom: '74%',
        left_right: '15%',
        text: '不想学了'
    },
    {
        type: 2,
        top_bottom: '36%',
        left_right: '68%',
        text: '学废了',
        // bgc: '#f00'
    }
    ]
];
//#endregion

// 设置文本不可被选中
let tool = new Tool(document, window);
tool.textProhibition();

// 主功能
let main = getDom('.main'); // 获取主盒子
let input = main.getDom('input'); // 选择文件的按钮
let select = main.getDom('.selectBox'); // 选择文件的显示框
let submit = main.getDom('.submit'); // 提交按钮

// 文件相关
let nowFile; // 当前文件
let initialFileList = input.files; // 初始文件列表
let nowFileList = initialFileList; // 当前文件列表

// 重置选择文件的框
function selectReset () {
    select.removeClass('select');
    select.innerText = '选择文件';
    let span = document.createElement('span');
    span.innerText = '＋';
    select.appendChild(span);
    select.title = '';
    nowFile = null;
    input.files = initialFileList;
}

// 文件改变函数
function inputChangeFunction () {
    let file = input.files[0];
    if (!file) {
        return;
    }

    if (!judge(file)) {

        // 如果文件不满足格式，则将文件列表撤销
        input.files = nowFileList;
        return;
    }

    // 维护文件相关变量
    nowFile = file;
    nowFileList = input.files;

    // 显示到页面上
    select.innerText = file.name;
    select.title = file.name;
    select.addClass('select');
}

// 判断文件名是否满足格式
function judge (file) {
    let str = file.name;
    if (subject == 'javaweb') {
        if (str.length > 18 || str.length < 16) {
            submitFalse('文件名不正确');
            return false;
        } else {
            let temp = str.toLowerCase().split('.').splice(-1);
            if (temp[0] != "doc" && temp[0] != "docx") {
                submitFalse('文件名类型不正确');
                return false;
            } else if (str.substring(0, 7) != "1915431" || str.substring(9, 10) != "_") {
                submitFalse('文件名命名不正确');
                return false;
            }
        }
        return true;
    } else if (subject == '多媒体') {
        let temp = str.toLowerCase().split('.').splice(-1); //191543XXX-XXX-XXX
        if (temp[0] != "avi" && temp[0] != "mp4" && temp[0] != "mpeg" && temp[0] != "flv" && temp[0] != "wmv" && temp[0] != "mov" && temp[0] != "3gp") {
            submitFalse('文件名类型不正确');
            return false;
        } else if (str.substring(0, 6) != "191543" || (str.substring(6, 7) != "1" && str.substring(6, 7) != "2") || str.substring(9, 10) != "-" || (str.substring(12, 13) != "-" && str.substring(13, 14) != "-")) {
            submitFalse('文件名命名不正确');
            return false;
        } else if (file.size > 200 * 1024 * 1024) {
            submitFalse('文件不能超过200M');
            return false;
        }
        return true;
    } else if (subject == '计组') {
        let temp = str.toLowerCase().split('.').splice(-1);
        let head = str.toLowerCase().split('.')[0];
        if (temp[0] != "doc" && temp[0] != "docx") {
            submitFalse('文件名类型不正确');
            return false;
        } else if (str.substring(0, 7) != "1915431" || head.substring(head.length - 3, head.length) != '实验一') {
            submitFalse('文件名命名不正确');
            return false;
        }
        return true;
    } else if (subject == 'javeee') {
        let temp = str.toLowerCase().split('.').splice(-1);
        let head = str.toLowerCase().split('.')[0];
        if (temp[0] != "doc" && temp[0] != "docx") {
            submitFalse('文件名类型不正确');
            return false;
        } else if (str.substring(0, 7) != "1915431" || head.substring(head.length - 3, head.length) != '实验一') {
            submitFalse('文件名命名不正确');
            return false;
        }
        return true;
    } else if (subject == 'python') {
        let temp = str.toLowerCase().split('.').splice(-1);
        let head = '《Python程序设计》实验报告3(实验5)-1915431';
        let last = str.split(head)[1];
        let num = null;
        if (last != null) {
            try {
                num = last.substring(0, 2) - 0;
            } catch (e) { }
        }
        console.log(num);
        if (temp[0] != "doc" && temp[0] != "docx") {
            submitFalse('文件名类型不正确');
            return false;
        } else if (str.indexOf(head) != 0 || (num == null) || !(num >= 1 && num <= 37)) {
            submitFalse('文件名命名不正确');
            return false;
        }
        return true;
    } else if (subject == '计网') {
        let temp = str.toLowerCase().split('.').splice(-1);
        let head = '广金实验报告4_1915431';
        let last = str.split(head)[1];
        let num = null;
        if (last != null) {
            try {
                num = last.substring(0, 2) - 0;
            } catch (e) { }
        }
        console.log(num);
        if (temp[0] != "doc" && temp[0] != "docx") {
            submitFalse('文件名类型不正确');
            return false;
        } else if (str.indexOf(head) != 0 || (num == null) || !(num >= 1 && num <= 37)) {
            submitFalse('文件名命名不正确');
            return false;
        }
        return true;
    } else if (subject == 'Oracle') {
        let temp = str.toLowerCase().split('.').splice(-1);
        let head = str.toLowerCase().split('.')[0];
        if (temp[0] != "doc" && temp[0] != "docx") {
            submitFalse('文件名类型不正确');
            return false;
        } else if (str.substring(0, 7) != "1915431" || head.substring(head.length - 5, head.length) != '实验报告一') {
            submitFalse('文件名命名不正确');
            return false;
        }
        return true;
    } else {
        alert('配置出错');
        console.log('配置出错');
        return false;
    }
}

// 添加选择文件事件
input.addEventListener('change', inputChangeFunction);

// 提交函数
function upload () {
    if (nowFile) {
        if (Date.now() < ddl) {
            let formdata = new FormData();
            formdata.append('uploadFile', nowFile);
            ajax({
                type: 'post',
                url: 'user/save',
                data: formdata,
                success: function (res) {
                    closeTips();
                    setTimeout(function () {
                        if (res.flag == 1) {
                            submitTrue();
                        } else {
                            submitFalse(res.message);
                            // alert(res.message);
                        }
                        submit.state = true;
                        selectReset();
                    }, 50);
                },
                progress: function (e) {
                    // 文件上传进度函数（以后可能会用到）
                }
            });
            submitLoading();
        } else {
            submitFalse('截止日期已过，不可提交');
            submit.state = true;
        }
    } else {
        submitFalse('请先选择文件');
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

// 主盒子相关鼠标事件
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
let transparentPlate = getDom('.transparentPlate');

// 提交结果提示框相关

let submitTips = getDom('.submitTips'); // 提交结果提示框盒子
let submitTipsPhoto = submitTips.getDom('.photo'); // 图片盒子
let submitTipsText = submitTips.getDom('.tipsText'); // 提示文本那盒子
let submitTipsYes = submitTips.getDom('.yes'); // 确定按钮
submitTips.state = false;

// 关闭提示框函数
function closeTips () {
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
function submitTrue () {
    transparentPlate.show();
    submitTipsPhoto.style.backgroundImage = 'url(img/submitTrue.png)';
    submitTipsText.innerText = '提交成功';
    submitTips.show();
    submitTips.state = true;
    submitTipsYes.show();
}

// 加载中函数
function submitLoading () {
    transparentPlate.show();
    submitTipsPhoto.style.backgroundImage = 'url(img/loading.gif)';
    submitTipsText.innerText = '上传中';
    submitTips.show();
    submitTips.state = true;
    submitTipsYes.hide();
}

// 提交失败函数
function submitFalse (str) {
    transparentPlate.show();
    submitTipsPhoto.style.backgroundImage = 'url(img/submitFalse.png)';
    submitTipsText.innerText = str ? str : '提交失败';
    submitTips.show();
    submitTips.state = true;
    submitTipsYes.show();
}

// 右侧列表
let logo = getDom('.logo');
let listBox = getDom('.listBox');
let listBoxState = false;

function toggleListBox () {
    if (listBoxState) {
        listBox.style.right = '-300px';
    } else {
        listBox.style.right = '0px';
    }
    listBoxState = !listBoxState;
}

logo.addEventListener('click', toggleListBox);
ajax({
    type: 'get',
    url: 'homework/queryHomework',
    success: function (res) {
        for (let text of res.data) {
            let li = document.createElement('li');
            li.innerText = text;
            listBox.append(li);
        }
    }
});

// 背景相关

let bgi = getDom('.bgi'); // 背景图盒子
let dialogBox = bgi.getDom('.dialogBox'); // 对话框盒子

// 初始化背景图
for (let i = 1; i <= cycleRange; i++) {
    let div = document.createElement('div');
    div.addClass('photo');
    div.style.backgroundImage = 'url(img/bg' + i + '.jpg)';
    div.style.opacity = 0;
    bgi.appendChild(div);
}

// 修改小对话框函数
function changeDialog () {

    // 遍历配置对象中当前索引
    for (let i = 0; i < bgiOptions[bgiIndex].length; i++) {

        // 获取type值
        let type = bgiOptions[bgiIndex][i].type;

        // 如果是-1则不用管
        if (type == -1) {
            continue;
        }

        // 创建新的div
        let dialog = document.createElement('div');

        // 添加类名
        dialog.addClass('dialog');

        (function (dialog) {
            setTimeout(function () {
                dialog.addClass('upDown');
            }, getIntRandom(0, 2000));
        })(dialog);

        // 设置初始圆角
        dialog.style.borderRadius = dialogBorderRadius;
        dialog.hide();
        if (type == 0) {
            dialog.style.borderTopLeftRadius = '0px';
            dialog.style.top = bgiOptions[bgiIndex][i].top_bottom;
            dialog.style.left = bgiOptions[bgiIndex][i].left_right;
        } else if (type == 1) {
            dialog.style.borderTopRightRadius = '0px';
            dialog.style.top = bgiOptions[bgiIndex][i].top_bottom;
            dialog.style.right = bgiOptions[bgiIndex][i].left_right;
        } else if (type == 2) {
            dialog.style.borderBottomLeftRadius = '0px';
            dialog.style.bottom = bgiOptions[bgiIndex][i].top_bottom;
            dialog.style.left = bgiOptions[bgiIndex][i].left_right;
        } else if (type == 3) {
            dialog.style.borderBottomRightRadius = '0px';
            dialog.style.bottom = bgiOptions[bgiIndex][i].top_bottom;
            dialog.style.right = bgiOptions[bgiIndex][i].left_right;
        } else {
            alert('配置出错！');
            console.log('配置出错！');
        }

        // 根据配置参数设置对应的值
        dialog.style.backgroundColor = bgiOptions[bgiIndex][i].bgc;
        dialog.innerText = bgiOptions[bgiIndex][i].text;

        // 展示到页面中
        dialog.show();
        dialogBox.appendChild(dialog);
    }
}

// 显示第一张
bgi.children[bgiIndex].style.opacity = 1;
changeDialog();

// 切换背景图
function changeBGI () {
    bgi.children[bgiIndex].style.opacity = 0;
    bgiIndex = bgiIndex + 1 > cycleRange ? 1 : bgiIndex + 1;
    bgi.children[bgiIndex].style.opacity = 1;
    dialogBox.removeAllChild();
    setTimeout(function () {
        changeDialog();
    }, 800);
}

// 切换背景图的定时器
let bgiTimer = setInterval(function () {
    changeBGI();
}, 8000);

// 停止轮播
if (!rotation) {
    clearInterval(bgiTimer);
}

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

// 封锁devtool相关
let admin = !adminState;
let nowP = 0;

// 解锁
document.addEventListener('keydown', function (e) {
    if (e.key == 'Shift' || e.key == 'Ctrl' || e.key == 'Alt' || e.key == 'CapsLock') {
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
function unlock () {
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
function check () {
    if (admin) {
        return;
    }

    function doCheck (a) {
        if (("" + a / a)["length"] !== 1 || a % 20 === 0) {
            (function () { }
            ["constructor"]("debugger")())
        } else {
            (function () { }
            ["constructor"]("debugger")())
        }
        doCheck(++a);
    }
    try {
        doCheck(0);
    } catch (err) { }
};

let debuggerTimer = setInterval(function () {
    check();
}, 4000);

check();
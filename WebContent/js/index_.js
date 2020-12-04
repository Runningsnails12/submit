$(function () {
    var nameflag = 0,
        typeflag = 0,
        sizeflag = 0;
    $(".d").on("click", function () {
        if (getFileName().trim() == "") {
            $(".info").text("请上传文件");
            return
        }
        check();
        // console.log(nameflag);
        // console.log(typeflag);
        // console.log(sizeflag);
        // console.log(myRotateVerify.verifyState);

        if (nameflag == 0 || typeflag == 0 || sizeflag == 0) {
            return
        }

        var formData = new FormData;
        formData.append("testfile", document.getElementById("c").files[0]);

        if (nameflag == 1 && typeflag == 1 && sizeflag == 1 && myRotateVerify.verifyState == true) {
            $(".info").text("正在提交");
            $.ajax({
                type: "post",
                url: "shaobing/io/upload",
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success: function (json) {

                    myRotateVerify.resetSlide();
                    if (json.flag == 1) {
                        $(".info").text("提交成功！");
                        alert("提交成功！");
                    } else {
                        $(".info").text("提交失败!!");
                        alert(json.message);
                    }

                }
            });
        }

    });
    $("#c").change(function () {
        check();
    });
    function check() {
        checkSize();
        checkType();
        checkFileName();
    }
    function getFileName() {
        var fileName = "";
        fileName = $("#c").val().split("\\").pop();
        fileName = fileName.substring(0, fileName.lastIndexOf("."));
        return fileName;
    }

    function checkFileName() {
        if (getFileName().substring(0, 7) != "1915431" || getFileName().substring(9, 10) != "_") {
            $(".info").text("文件名不正确，格式为1915431XX_贾铭");
            nameflag = 0;
        } else {
            if ($(".info").text() == "文件名不正确，格式为1915431XX_贾铭") {
                $(".info").text("");
            }
            nameflag = 1;
        }
    }
    function checkType() {
        var str = $("#c").val().toLowerCase().split('.').splice(-1);
        if (str[0] != "doc" && str[0] != "docx") {
            $(".info").text("文件格式不正确");
            typeflag = 0;

        } else {
            if ($(".info").text() == "文件格式不正确") {
                $(".info").text("");
            }
            typeflag = 1;
        }
    }
    function checkSize() {
        var c = document.getElementById("c").files;
        if (c[0].sizesize > 20 * 1024 * 1024) {
            $(".info").text("文件大于20M");
            sizeflag = 0;
        } else {
            if ($(".info").text("") == "文件大于20M") {
                $(".info").text("");
            }
            sizeflag = 1;
        }
    }


    var myRotateVerify = new RotateVerify('#rotateWrap', {
        initText: '滑动将图片转正',//默认
        slideImage: ['1.jpg'],//arr  [imgsrc1,imgsrc2] 或者str 'imgsrc1'
        slideAreaNum: 10,// 误差范围角度 +- 10(默认)
        getSuccessState: function (res) {//验证通过 返回  true;
            // console.log('例1' + res);
        }
    })
    //重置 
    // $("#resetBtn").on('click', function () {
    //     myRotateVerify.resetSlide();
    // })
    // //可拿到 验证状态 
    // $("#testBtn").on('click', function () {
    //     alert(myRotateVerify.verifyState);
    // })
})
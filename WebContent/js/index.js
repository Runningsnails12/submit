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
                url: "/shaobing/io/updateIcon",
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success: function (json) {
                	console.log(json.flag);
                    if (json.flag == 1) {
                    	//alert(json.flag);
                        $(".info").text("提交成功！");
                        window.open("http://106.15.94.131/shaobing/html/Jump.html");
                        //setTimeout(function () {window.location.reload();}, 3000);
                        //alert("okk！");
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
var a= /^1915431\d\d_..$/;  
var b= /^1915431\d\d_...$/;  
        if (a.test(getFileName())||b.test(getFileName())) {
            if ($(".info").text() == "文件名不正确，格式为1915431XX_XXX/1915431XX_XX") {
                $(".info").text("");
                
            }
            nameflag = 1;
        } else {
            $(".info").text("文件名不正确，格式为1915431XX_XXX/1915431XX_XX");
            nameflag = 0;
            
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
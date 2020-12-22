var body = getDom('body');
function run(path) {
    var urlArr = new Array();
    for (var i = 0; i < path.length; i++) {
        urlArr.push(path[i].split('\\')[3]);
    }
    urlArr.sort();
    console.log(urlArr);
    for (var i = 0; i < urlArr.length; i++) {
        var a = document.createElement('a');
        var url = urlArr[i];
        console.log(url);
        a.href = 'http://106.15.94.131/shaobing/io/downloadd?filename=' + url;
        a.innerText = url;
        a.style.display = 'block';
        body.appendChild(a);
    }
}
ajax({
    type: 'get',
    url: '/shaobing/io/getPath',
    success: function (res) {
        run(res);
    }
});
// js、css url或资源路径(css文件推荐放在js文件前面)
var jsCss = [
    '../plugins/xxx/css/test.css'
    ,'../css/test1.css',
    ,'../css/test1.css',
    ,'../css/test1.css',
    ,'../css/test1.css',
    ,'../css/test1.css',
    ,'../css/test1.css'
];

new CSRE({
    // 静态资源相对路径或url
    paths:jsCss,
    loadend: function () {
        //console.log("静态资源加载完成")
        // 加载完成
    },
    error: function (errElement) {
        // 每次onerror均会输出
        //console.log(errElement)
    }
});

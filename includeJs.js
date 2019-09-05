// js、css url或资源路径(css文件推荐放在js文件前面)
var jsCss = [
    '../../../../../js/test1.js',
   '../../../../../js/test2.js',
   '../../../../../js/test3.js',
   '../../../../../js/test4.js',
   '../../../../../js/test5.js',
   '../../../../../js/test6.js',
   '../../../../../js/test7.js',
   '../../../../../js/test8.js',
   '../../../../../js/test9.js',
   '../../../../../js/test10.js',
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

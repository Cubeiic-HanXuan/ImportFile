/**
 * js|css等静态资源预加载
 * @author HanXuan
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && (define.amd || define.cmd) ? define(factory) :
            global.CSRE = factory();
}(this, function () {
    'use strict';

    var CODES = {
        1: '此路径不是数组'
    };

    var Skin = {
        1:'不是主题加载模式'
    };

    /**
     * 合并多对象|深度拷贝
     * @returns {any | Object | {} | extend}
     */
    function extend() {
        var length = arguments.length;
        var target = arguments[0] || {};
        if (typeof target!="object" && typeof target != "function") {
            target = {};
        }
        if (length == 1) {
            target = this;
            i--;
        }
        for (var i = 1; i < length; i++) {
            var source = arguments[i];
            for (var key in source) {
                // 使用for in会遍历数组所有的可枚举属性，包括原型。
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }

    function CSRE(opts) {

        let defaultOpt = {
            skin:false
        };

        this.opts =  extend({} , defaultOpt , opts);

        this.createStaticElements(function () {
            opts.loadend && opts.loadend();
        })
    }

    //var fn = CSRE.prototype;

    // 创建Elements
    CSRE.prototype.createStaticElements = function (callback) {

        // 判断this.paths是否为数组
        if (!this.opts.paths || !this.opts.paths instanceof Array) {
            callback({
                code: 1,
                msg: CODES[1]
            });
            return;
        }else if (!this.opts.skin || !this.opts.skin instanceof Boolean){
            callback({
                code: 1,
                msg: Skin[1]
            });
            //TODO 主题加载拓展
        }
        var _this = this;
        // 数组长度
        var len = this.opts.paths.length;
        // 已处理完成数量
        var count = 0;

        // 只处理js, css文件
        for (var i = 0; i < len; i++) {
            var val = this.opts.paths[i];
            this.createHrefElement(val, loadEnd, loadError,this.opts.skin);
        } // end of for

        function loadEnd(el) {
            count++;
            if (count === len) callback();
            //console.log(el);
        }

        function loadError(el) {
            _this.opts.error && _this.opts.error(el);
            count++;
            if (count === len) callback();
        }
    };

    /**
     * 创建静态资源元素节点
     * @param href 文件路径
     * @param loadend 成功回调
     * @param loadErr 失败回调
     * @param len 文件 数据
     */
    CSRE.prototype.createHrefElement = function (href, loadend, loadErr,skin) {

        if (/\w+\.js/.test(href)) {
            document.write("<script type='text/javascript' src='"+href+"'></script>");
        } else if (/\w+\.css/.test(href)) {
            if (skin){
                document.write("<link rel='stylesheet' type='text/css' href='"+href+"' kit-skin>");
            }else{
                document.write("<link rel='stylesheet' type='text/css' href='"+href+"'>");
            }
        }
        if (typeof href != "undefined") {
            loadend(this);
            loadErr(this);
        }
    };
    return CSRE;
}));

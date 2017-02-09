'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.weixinApi = undefined;

var _request = require('./request');

var jsApiList = ['chooseWXPay', 'hideOptionMenu', 'getLocation', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo']; /**
                                                                                                                                                                                                                                                                                                                                                                                      * @file 微信jssdk 配置
                                                                                                                                                                                                                                                                                                                                                                                      * @author peilonghui
                                                                                                                                                                                                                                                                                                                                                                                      */

var noop = function noop() {};
var wx = window.wx;

var DEFAULT_SHARE_DATA = {
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    success: function success() {
        // 用户确认分享后执行的回调函数
    },
    cancel: function cancel() {
        // 用户取消分享后执行的回调函数
    }
};

var weixinApi = exports.weixinApi = {
    getConfig: function getConfig(url) {
        (0, _request.getJson)(url, {
            url: location.href
        }, function (data) {
            data.jsApiList = jsApiList;
            // data.debug = true;
            wx.config(data);
        });
    },
    ready: function ready() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

        wx.ready(function () {
            wx.checkJsApi({
                jsApiList: jsApiList,
                success: function success() {
                    wx.hideOptionMenu();
                    callback();
                }
            });
        });
    },
    chooseImage: function chooseImage() {
        var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 9;
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

        wx.chooseImage({
            count: limit,
            success: function success(e) {
                callback(e.localIds);
            }
        });
    },
    previewImage: function previewImage() {
        var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var urls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        wx.previewImage({
            current: current,
            urls: urls
        });
    },
    uploadImage: function uploadImage() {
        var localId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var _success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

        wx.uploadImage({
            localId: localId,
            isShowProgressTips: 0,
            success: function success(response) {
                _success(response.serverId);
            }
        });
    },
    startRecord: function startRecord() {
        wx.startRecord();
    },
    stopRecord: function stopRecord() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

        wx.stopRecord({
            success: function success(res) {
                callback(res.localId);
            }
        });
    },
    uploadVoice: function uploadVoice() {
        var localId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var _success2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

        wx.uploadVoice({
            localId: localId,
            isShowProgressTips: 0,
            success: function success(response) {
                _success2(response.serverId);
            }
        });
    },
    onVoiceRecordEnd: function onVoiceRecordEnd() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

        wx.onVoiceRecordEnd({
            complete: function complete(res) {
                callback(res.localId);
            }
        });
    },
    playVoice: function playVoice() {
        var localId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        wx.playVoice({
            localId: localId
        });
    },
    pauseVoice: function pauseVoice() {
        var localId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        wx.playVoice({
            localId: localId
        });
    },
    stopVoice: function stopVoice() {
        var localId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        wx.stopVoice({
            localId: localId
        });
    },
    onVoicePlayEnd: function onVoicePlayEnd() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

        wx.onVoicePlayEnd({
            success: function success(response) {
                callback(response.localId);
            }
        });
    },
    share: function share(config) {

        var shareData = $.extend({}, DEFAULT_SHARE_DATA);
        $.extend(shareData, config);

        wx.onMenuShareTimeline(shareData);
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareQQ(shareData);
        wx.onMenuShareWeibo(shareData);
        wx.onMenuShareQZone(shareData);
    },
    showOptionMenu: function showOptionMenu() {
        wx.showOptionMenu();
    }
};
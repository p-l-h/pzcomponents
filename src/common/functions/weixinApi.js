/**
 * @file 微信jssdk 配置
 * @author peilonghui
 */


import {getJson} from './request';


const jsApiList = [
    'chooseWXPay', 'hideOptionMenu', 'getLocation',
    'chooseImage', 'previewImage', 'uploadImage', 'downloadImage',
    'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice',
    'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice',
    'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone',
    'onMenuShareWeibo'
];
const noop = () => {};
const wx = window.wx;

const DEFAULT_SHARE_DATA = {
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    success: function () {
        // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
};

export const weixinApi = {
    getConfig: (url) => {
        getJson(
            url,
            {
                url: location.href
            },
            (data) => {
                data.jsApiList = jsApiList;
                // data.debug = true;
                wx.config(data);
            }
        );

    },
    ready: (callback = noop) => {
        wx.ready(
            () => {
                wx.checkJsApi({
                    jsApiList: jsApiList,
                    success: () => {
                        wx.hideOptionMenu();
                        callback();
                    }
                });
            }
        );
    },
    chooseImage: (limit=9, callback = noop) => {
        wx.chooseImage({
            count: limit,
            success: (e) => {
                callback(e.localIds);
            }
        });
    },
    previewImage: (current='', urls=[]) => {
        wx.previewImage({
            current: current,
            urls: urls
        });
    },
    uploadImage: (localId='', success=noop) => {
        wx.uploadImage({
            localId: localId,
            isShowProgressTips: 0,
            success: (response) => {
                success(response.serverId);
            }
        });
    },
    startRecord: () => {
        wx.startRecord();
    },
    stopRecord: (callback=noop) => {
        wx.stopRecord({
            success: (res) => {
                callback(res.localId);
            }
        });
    },
    uploadVoice: (localId='', success=noop) => {
        wx.uploadVoice({
            localId: localId,
            isShowProgressTips: 0,
            success: (response) => {
                success(response.serverId);
            }
        });
    },
    onVoiceRecordEnd: (callback=noop) => {
        wx.onVoiceRecordEnd({
            complete: (res) => {
                callback(res.localId);
            }
        });
    },
    playVoice: (localId='') => {
        wx.playVoice({
            localId: localId
        });
    },
    pauseVoice: (localId='') => {
        wx.playVoice({
            localId: localId
        });
    },
    stopVoice: (localId='') => {
        wx.stopVoice({
            localId: localId
        });
    },
    onVoicePlayEnd: (callback=noop) => {
        wx.onVoicePlayEnd({
            success: (response) => {
                callback(response.localId);
            }
        });
    },
    share: (config) => {

        let shareData = $.extend({}, DEFAULT_SHARE_DATA);
        $.extend(shareData, config);

        wx.onMenuShareTimeline(shareData);
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareQQ(shareData);
        wx.onMenuShareWeibo(shareData);
        wx.onMenuShareQZone(shareData);
    },
    showOptionMenu: () => {
        wx.showOptionMenu();
    }
};


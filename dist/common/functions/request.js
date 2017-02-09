'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.postJson = exports.doPost = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.getJson = getJson;
exports.getJsonp = getJsonp;

var _Toast = require('../../components/Toast');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).on('ajaxError', function (xhr, options, error) {
    (0, _Toast.unloading)();
    (0, _Toast.toast)('请求异常');
});

function getJson(url, data, success) {

    (0, _Toast.loading)();
    return $.getJSON(url + '?' + $.param(data), function (response) {
        (0, _Toast.unloading)();
        if (response && +response.code === 0) {
            success(response.data);
        } else {
            (0, _Toast.toast)(response.msg || '请求出错了');
        }
    });
}

function doPost(url, data, _success, always) {
    (0, _Toast.loading)();

    return $.ajax({
        url: url,
        data: data,
        type: 'POST',
        success: function success(response) {
            (0, _Toast.unloading)();
            if (response && +response.code === 0) {
                _success(response.data);
            } else {
                (0, _Toast.toast)(response.msg || '请求出错了');
            }
            always && always(response);
        },
        error: function error() {
            (0, _Toast.toast)('请求出错了');
        },
        complete: function complete() {
            (0, _Toast.unloading)();
        }
    });
}

exports.doPost = doPost;
function postJson(url, data, _success2, always) {
    (0, _Toast.loading)();
    return $.ajax({
        url: url,
        data: (0, _stringify2.default)(data),
        type: 'POST',
        contentType: 'application/json',
        success: function success(response) {
            (0, _Toast.unloading)();
            if (response && +response.code === 0) {
                _success2(response.data);
            } else {
                (0, _Toast.toast)(response.msg || '请求出错了');
            }
            always && always(response);
        },
        error: function error() {
            (0, _Toast.toast)('请求出错了');
        },
        complete: function complete() {
            (0, _Toast.unloading)();
        }
    });
}

exports.postJson = postJson;
function getJsonp(url, callback) {
    $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function success(response) {
            callback(response);
        }
    });
}
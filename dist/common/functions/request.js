'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.postJson = exports.doPost = exports.getJson = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.getJsonp = getJsonp;

var _Toast = require('../../components/Toast');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).on('ajaxError', function (xhr, options, error) {
    (0, _Toast.toast)('请求异常');
});

function getJson(url, data, _success, _error, always) {
    return $.ajax({
        url: url,
        data: data,
        type: 'GET',
        dataType: 'json',
        success: function success(response) {
            if (response && +response.code === 0) {
                _success(response.data);
            } else {
                (0, _Toast.toast)(response.msg || '请求出错了');
                _error && _error(response);
            }
        },
        error: function error() {
            _error && _error();
        },
        complete: function complete() {
            always && always();
        }
    });
}

exports.getJson = getJson;
function doPost(url, data, _success2, _error2, always) {
    return $.ajax({
        url: url,
        data: data,
        type: 'POST',
        success: function success(response) {
            if (response && +response.code === 0) {
                _success2(response.data);
            } else {
                (0, _Toast.toast)(response.msg || '请求出错了');
                _error2 && _error2(response);
            }
        },
        error: function error() {
            (0, _Toast.toast)('请求出错了');
            _error2 && _error2();
        },
        complete: function complete() {
            always && always();
        }
    });
}

exports.doPost = doPost;
function postJson(url, data, _success3, _error3, always) {
    return $.ajax({
        url: url,
        data: (0, _stringify2.default)(data),
        type: 'POST',
        contentType: 'application/json',
        success: function success(response) {
            if (response && +response.code === 0) {
                _success3(response.data);
            } else {
                (0, _Toast.toast)(response.msg || '请求出错了');
                _error3 && _error3(response);
            }
        },
        error: function error() {
            (0, _Toast.toast)('请求出错了');
            _error3 && _error3();
        },
        complete: function complete() {
            always && always();
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
//# sourceMappingURL=request.js.map
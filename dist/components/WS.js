'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CustomWebSocket = exports.IF_SUPPORT = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _EventObserver2 = require('./EventObserver');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IF_SUPPORT = exports.IF_SUPPORT = !!(window.WebSocket || window.MozWebSocket);

var WebSocket = window.WebSocket || window.MozWebSocket;

var CustomWebSocket = exports.CustomWebSocket = function (_EventObserver) {
    (0, _inherits3.default)(CustomWebSocket, _EventObserver);

    function CustomWebSocket(url, protocols) {
        (0, _classCallCheck3.default)(this, CustomWebSocket);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CustomWebSocket.__proto__ || (0, _getPrototypeOf2.default)(CustomWebSocket)).call(this));

        if (protocols) {
            _this.ws = new WebSocket(url, protocols);
        } else {
            _this.ws = new WebSocket(url);
        }
        _this.bindEvents();
        return _this;
    }

    (0, _createClass3.default)(CustomWebSocket, [{
        key: 'keepAlive',
        value: function keepAlive() {
            var cws = this;
            cws.startHeartBeat();
            cws.wsInterval = window.setInterval(function () {
                cws.startHeartBeat();
            }, 20000);
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var cws = this;
            var ws = cws.ws;
            ws.onopen = function (evt) {
                cws.fire('open', evt);
                cws.keepAlive();
            };

            ws.onclose = function (evt) {
                cws.fire('close', evt);
                window.clearInterval(cws.wsInterval);
            };

            ws.onmessage = function (evt) {
                cws.fire('message', evt);
            };

            ws.onerror = function (evt) {
                cws.fire('error', evt);
            };
        }
    }, {
        key: 'startHeartBeat',
        value: function startHeartBeat() {
            this.send({
                type: 'ping'
            });
        }
    }, {
        key: 'send',
        value: function send(data) {
            this.ws.send((0, _stringify2.default)(data));
        }
    }, {
        key: 'close',
        value: function close() {
            this.ws.close();
        }
    }]);
    return CustomWebSocket;
}(_EventObserver2.EventObserver);
//# sourceMappingURL=WS.js.map
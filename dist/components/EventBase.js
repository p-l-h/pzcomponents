"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventBase = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventBase = exports.EventBase = function () {
    function EventBase(container) {
        (0, _classCallCheck3.default)(this, EventBase);

        this.container = container;
    }

    (0, _createClass3.default)(EventBase, [{
        key: "on",
        value: function on(eventName, handler) {
            this.container.on(eventName, handler);
        }
    }, {
        key: "trigger",
        value: function trigger(eventName, evt) {
            this.container.trigger(eventName, evt);
        }
    }, {
        key: "off",
        value: function off(eventName, handler) {
            this.container.off(eventName, handler);
        }
    }]);
    return EventBase;
}();
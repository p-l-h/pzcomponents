'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventObserver = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file 监听
 * @author peilonghui
 */

var EventObserver = exports.EventObserver = function () {
    function EventObserver() {
        (0, _classCallCheck3.default)(this, EventObserver);

        this.handlers = {};
    }

    (0, _createClass3.default)(EventObserver, [{
        key: 'on',
        value: function on(eventType, handler) {
            var handlers = this.handlers;
            handlers[eventType] = handlers[eventType] || [];
            handlers[eventType].push(handler);
        }
    }, {
        key: 'fire',
        value: function fire() {

            var args = Array.prototype.slice.call(arguments, 1);
            var eo = this;

            var currentHandlers = eo['handlers'][arguments[0]];

            if (currentHandlers && currentHandlers.length) {
                currentHandlers.forEach(function (item) {
                    item.apply(eo, args);
                });
            }
        }
    }]);
    return EventObserver;
}();
//# sourceMappingURL=EventObserver.js.map
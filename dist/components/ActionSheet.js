'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ActionPanel = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Panel = require('./Panel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionPanel = exports.ActionPanel = function () {
    function ActionPanel(options) {
        (0, _classCallCheck3.default)(this, ActionPanel);

        this.options = options;
        this.init();
    }

    (0, _createClass3.default)(ActionPanel, [{
        key: 'init',
        value: function init() {
            var _this = this;

            var self = this;
            self.main = self.getMain();

            var events = self.options.events;

            var currentCancelEvent = events.cancel;

            events.cancel = function () {
                currentCancelEvent && currentCancelEvent.apply(_this);
                self.hide();
            };

            self.main.on('click', 'button', function () {
                var opttype = $(this).data('opttype');
                var currentEventHandler = events[opttype];
                currentEventHandler && currentEventHandler.call(this);
            });

            self.panel = new _Panel.Panel({
                inner: self.main,
                closeOnTouchBlack: true
            });
        }
    }, {
        key: 'getMain',
        value: function getMain() {
            return $(this.getTemplate());
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {
            var result = ['<div class="component-actionsheet"><ul>'];
            var self = this;
            var options = self.options;

            if (options.tip) {
                result.push('<li class="component-actionsheet-tip">' + options.tip + '</li>');
            }

            options.actions.forEach(function (item) {
                result.push(self.getItemTemplate(item));
            });
            result.push('</ul>');

            return result.join('') + '<div class="component-actionsheet-cancel">' + '<button type="button" data-opttype="cancel">取消</button>' + '</div>';
        }
    }, {
        key: 'getItemTemplate',
        value: function getItemTemplate(item) {
            return '\n            <li><button data-opttype="' + item.opttype + '">' + item.text + '</button></li>\n        ';
        }
    }, {
        key: 'show',
        value: function show() {
            this.panel.show();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.panel.hide();
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this.panel.dispose();
            this.main.off('click').remove();
        }
    }]);
    return ActionPanel;
}();
//# sourceMappingURL=ActionSheet.js.map
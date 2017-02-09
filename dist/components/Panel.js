'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Panel = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Panel = exports.Panel = function () {
    function Panel(options) {
        (0, _classCallCheck3.default)(this, Panel);

        this.options = options;
        this.init();
    }

    (0, _createClass3.default)(Panel, [{
        key: 'init',
        value: function init() {

            var self = this;
            var options = self.options;

            self.container = $(self.getTemplate());

            if (typeof options.inner !== 'string') {
                self.inner = options.inner;
            } else {
                self.inner = options.inner;
            }

            self.container.append(self.inner);

            if (options.bindEvents) {
                options.bindEvents(self.container);
            }

            $(document.body).append(self.container);
            self.bindEvents();
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {
            return '\n            <div class="component-panel">\n                <div class="mask"></div>\n            </div>\n        ';
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {

            var self = this;
            var inner = self.inner;
            var options = self.options;

            if (options.closeOnTouchBlack) {
                self.container.on('click', function (e) {
                    if (!$.contains(inner[0], e.target)) {
                        self.hide();
                    }
                });
            }
        }
    }, {
        key: 'show',
        value: function show() {
            $(document.body).addClass('overflow-hidden');
            this.container.show();
        }
    }, {
        key: 'hide',
        value: function hide() {
            $(document.body).removeClass('overflow-hidden');
            this.container.hide();
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this.hide();
            this.container.off('click').remove();
        }
    }]);
    return Panel;
}();
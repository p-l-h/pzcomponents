'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Progress = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Progress = exports.Progress = function () {
    function Progress(container, options) {
        (0, _classCallCheck3.default)(this, Progress);

        this.container = container;
        this.options = options;
        this.init();
    }

    (0, _createClass3.default)(Progress, [{
        key: 'init',
        value: function init() {

            var self = this;

            if (self.options.skin) {
                self.container.addClass('skin-' + self.options.skin);
            }
            self.bar = $(self.getTemplate());
            self.setValue(self.options.value);

            self.bar.appendTo(self.container);
            self.initEvents();
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {
            return '\n            <div class="component-progress-value">\n                <i></i>\n            </div>\n        ';
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            var self = this;

            var startPosition = {
                x: 0,
                y: 0
            };
            var endPosition = {
                x: 0,
                y: 0
            };

            var startValue = 0;

            self.bar.children('i').on('touchstart', function (e) {
                e.preventDefault();
                e.stopPropagation();
                startValue = self.options.value;

                var touch = e.changedTouches[0];

                startPosition.x = touch.pageX;
                startPosition.y = touch.pageY;
            });

            self.container.on('touchmove', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var touch = e.changedTouches[0];
                var barWidth = self.container.width();

                endPosition.x = touch.pageX;
                endPosition.y = touch.pageY;

                var moved = endPosition.x - startPosition.x;
                moved = moved / barWidth * 100;

                self.setValueByDrag(+startValue + moved);
            });
        }
    }, {
        key: 'setValue',
        value: function setValue(val) {

            if (!val) {
                val = 0;
            }

            this.options.value = val;
            this.bar.css('width', val + '%');
        }
    }, {
        key: 'setValueByDrag',
        value: function setValueByDrag(val) {

            var self = this;

            if (self.dragCallback) {
                self.dragCallback.call(self, val);
            } else {
                self.setValue(val.toFixed(2));
            }
        }
    }, {
        key: 'setDragCallback',
        value: function setDragCallback(callback) {
            this.dragCallback = callback;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.options.value;
        }
    }]);
    return Progress;
}();
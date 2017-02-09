'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TimeProgress = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Progress = require('./Progress');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimeProgress = exports.TimeProgress = function () {

    /**
     * Creates an instance of TimeProgress.
     * 示例options
     * {
     *    total: 60,
     *    value: 30
     * }
     * @param {ZeptoElelent} container
     * @param {Object} options
     *
     */

    function TimeProgress(container, options) {
        (0, _classCallCheck3.default)(this, TimeProgress);

        this.container = container;
        this.options = options;
        this.init();
    }

    (0, _createClass3.default)(TimeProgress, [{
        key: 'init',
        value: function init() {

            var self = this;
            self.container.html(self.getTemplate());

            if (self.options.skin) {
                self.container.addClass('skin-' + self.options.skin);
            }

            self.progress = new _Progress.Progress(self.container.find('.component-progress'), {
                value: self.calculateProgress(),
                skin: self.options.skin
            });

            self.progress.setDragCallback(function (percent) {
                if (percent > 100) {
                    percent = 100;
                }

                var currentTime = self.options.total * percent / 100;

                if (self.valueUpdatedByHand) {
                    self.valueUpdatedByHand.call(this, currentTime);
                } else {
                    self.setValue(currentTime);
                }
            });

            self.currentTimeElem = self.container.children('em');
            self.totalTimeElem = self.container.children('strong');
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {
            var self = this;
            return '\n            <em>' + self.formatSeconds(self.options.value) + '</em>\n            <div class="component-progress">\n            </div>\n            <strong>' + self.formatSeconds(self.options.total) + '</strong>\n        ';
        }
    }, {
        key: 'setValue',
        value: function setValue(val) {

            val = val || 0;
            var self = this;

            self.options.value = val;
            self.updateProgress();
            self.currentTimeElem.html(self.formatSeconds(val));
        }
    }, {
        key: 'setTotal',
        value: function setTotal(total) {
            var self = this;
            if (total === self.options.total) {
                return;
            }
            self.options.total = total;
            self.totalTimeElem.html(self.formatSeconds(total));
        }
    }, {
        key: 'calculateProgress',
        value: function calculateProgress() {
            var self = this;
            return (self.options.value / self.options.total * 100).toFixed(2);
        }
    }, {
        key: 'updateProgress',
        value: function updateProgress() {
            var self = this;
            self.progress.setValue(self.calculateProgress());
        }
    }, {
        key: 'setValueUpdatedByHand',
        value: function setValueUpdatedByHand(callback) {
            this.valueUpdatedByHand = callback;
        }
    }, {
        key: 'formatSeconds',
        value: function formatSeconds(seconds) {
            var minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);

            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            return minutes + ':' + seconds;
        }
    }]);
    return TimeProgress;
}();
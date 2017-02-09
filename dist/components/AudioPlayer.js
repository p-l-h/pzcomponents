'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AudioPlayer = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _TimeProgress = require('./TimeProgress');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AudioPlayer = exports.AudioPlayer = function () {
    function AudioPlayer(container, options) {
        (0, _classCallCheck3.default)(this, AudioPlayer);

        this.container = container;
        this.options = options || {};

        this.init();
    }

    (0, _createClass3.default)(AudioPlayer, [{
        key: 'init',
        value: function init() {
            var self = this;
            var options = self.options;
            var container = self.container;

            options.timeProgress = options.timeProgress || {};

            if (options.skin) {
                self.container.addClass('skin-' + options.skin);
                options.timeProgress.skin = options.skin;
            }

            if (!options.url) {
                options.url = container.data('url');
            }

            if (!options.timeProgress.total) {
                options.timeProgress.total = container.data('seconds');
                options.timeProgress.value = options.timeProgress.value || 0;
            }

            container.html(self.getTemplate() + container.html());
            self.audio = self.container.children('audio')[0];
            self.timeProgress = new _TimeProgress.TimeProgress(self.container.find('.component-timeprogress'), self.options.timeProgress);

            self.timeProgress.setValueUpdatedByHand(function (currentTime) {
                self.audio.currentTime = currentTime;
            });

            self.initEvents();
            container.css('display', 'block');
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            var self = this;
            var audio = self.audio;
            self.container.find('.' + self.getClass('toggle')).on('click', function () {

                if (self.playing) {
                    audio.pause();
                } else {
                    audio.play();
                    self.container.addClass('active');
                }

                self.playing = !self.playing;
            });

            audio.addEventListener('durationchange', function () {
                self.timeProgress.setTotal(audio.duration);
            });

            audio.addEventListener('pause', function () {

                self.container.removeClass('active');
                self.playing = false;
            });

            audio.addEventListener('timeupdate', function () {

                var currentTime = audio.currentTime;
                self.timeProgress.setValue(currentTime);
            });
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {
            var self = this;
            return '\n            <div class="' + self.getClass('toggle') + '">\n                <i class="ion-play"></i>\n                <i class="ion-pause"></i>\n            </div>\n            <div class="component-timeprogress">\n            </div>\n            <div class="' + self.getClass('volume') + '">\n            </div>\n            <audio preload="metadata"  controls>\n                <source src="' + self.options.url + '" type="audio/mpeg" codecs="mp3"></source>\n            </audio>\n        ';
        }
    }, {
        key: 'getClass',
        value: function getClass(suffix) {
            return 'component-audioplayer' + (suffix ? '-' + suffix : '');
        }
    }]);
    return AudioPlayer;
}();
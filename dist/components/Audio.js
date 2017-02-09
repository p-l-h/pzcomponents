'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Audio = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _weixinApi = require('../common/functions/weixinApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Audio = exports.Audio = function () {
    function Audio(container) {
        (0, _classCallCheck3.default)(this, Audio);


        this.container = container;
        this.url = container.data('url');
        this.localId = container.data('localid');
        this.seconds = container.data('seconds');
        this.init();
    }

    (0, _createClass3.default)(Audio, [{
        key: 'init',
        value: function init() {

            var container = this.container;

            if (+container.data('inited')) {
                return;
            }

            container.html(this.getTemplate() + container.html());

            var thisWidth = 0.15 + Math.sqrt(this.seconds / 60) * 0.85;
            thisWidth *= 100;
            container.css('width', thisWidth + '%');
            this.bindEvents();

            container.data('inited', 1);
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {
            if (!this.localId) {
                return '\n                <i></i>\n                <em>' + this.seconds + '\'\'</em>\n                <div class="component-audio-progress"></div>\n                <audio preload="none" controls src="' + this.url + '"></audio>\n            ';
            } else {
                return '\n                <i></i>\n                <em>' + this.seconds + '\'\'</em>\n                <div class="component-audio-progress"></div>\n            ';
            }
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var that = this;

            _weixinApi.weixinApi.onVoicePlayEnd(function (localId) {
                if (localId === that.localId) {
                    that.weixinToggle();
                }
            });
            this.container.on('click', function () {

                if (that.localId) {
                    that.weixinToggle();
                } else {
                    that.toggle();
                }
            });
        }
    }, {
        key: 'weixinToggle',
        value: function weixinToggle() {
            var that = this;
            var container = this.container;
            var gif = container.children('i');

            if (that.playing) {
                _weixinApi.weixinApi.stopVoice(that.localId);
                gif.removeClass('playing');
            } else {
                _weixinApi.weixinApi.playVoice(that.localId);
                gif.addClass('playing');
            }

            that.playing = !that.playing;
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            var $this = this.container;
            var $audio = $this.children('audio');
            var audio = $audio[0];
            var gif = $this.children('i');
            var progress = $this.children('.component-audio-progress');

            if (!$audio.data('binded')) {
                audio.addEventListener('pause', function () {
                    gif.removeClass('playing');
                });

                audio.addEventListener('timeupdate', function () {

                    var percent = audio.currentTime / audio.duration * 100;

                    if (percent > 100) {
                        percent = 100;
                    }
                    progress.css('width', percent + '%');
                });

                $audio.data('binded', 1);
            }

            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }

            gif.addClass('playing');
        }
    }, {
        key: 'distroy',
        value: function distroy() {}
    }]);
    return Audio;
}();
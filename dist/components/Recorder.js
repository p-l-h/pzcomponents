'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Panel = require('./Panel');

var _weixinApi = require('../common/functions/weixinApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Recorder = function () {
    function Recorder(options) {
        (0, _classCallCheck3.default)(this, Recorder);

        this.options = options;
        this.init();
    }

    (0, _createClass3.default)(Recorder, [{
        key: 'init',
        value: function init() {

            var self = this;

            self.main = $(self.getTemplate());
            self.panel = new _Panel.Panel({
                inner: self.main
            });
            self.counterEm = self.main.find('em');

            self.bindEvents();
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {
            return '\n            <div class="component-recorder">\n                <div class="component-recorder-text">点击录音</div>\n                <div class="component-recorder-text active"><em>0</em>s/60s</div>\n                <button type="button"></button>\n            </div>\n        ';
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var self = this;
            var main = self.main;

            main.on('click', 'button', function (e) {

                if (self.recording && self.timeCounter < 1) {
                    return;
                }

                if (self.recording) {
                    self.stopRecord();
                } else {
                    self.startRecord();
                }
            });
        }
    }, {
        key: 'startRecord',
        value: function startRecord() {
            var self = this;
            self.recording = true;
            _weixinApi.weixinApi.startRecord();
            self.main.addClass('active');
            self.counterEm.html(0);

            self.startRecordTimer();

            _weixinApi.weixinApi.onVoiceRecordEnd(function (localId) {
                self.voiceRecorded(localId, 60);
                self.timeCounter = 0;
            });
        }
    }, {
        key: 'stopRecord',
        value: function stopRecord() {
            var self = this;

            _weixinApi.weixinApi.stopRecord(function (localId) {
                self.voiceRecorded(localId, self.timeCounter);
            });
        }
    }, {
        key: 'startRecordTimer',
        value: function startRecordTimer() {
            var self = this;
            self.timeCounter = 0;
            self.recordInterval = window.setInterval(function () {
                self.timeCounter++;
                self.counterEm.html(self.timeCounter);
            }, 1000);
        }
    }, {
        key: 'voiceRecorded',
        value: function voiceRecorded(localId, seconds) {
            var self = this;
            var options = self.options;
            window.clearInterval(self.recordInterval);
            self.recording = false;
            self.hide();

            if (options.success) {
                options.success(localId, seconds);
            }
        }
    }, {
        key: 'show',
        value: function show() {
            this.main.removeClass('active');
            this.panel.show();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.panel.hide();
        }
    }]);
    return Recorder;
}();

exports.default = Recorder;
//# sourceMappingURL=Recorder.js.map
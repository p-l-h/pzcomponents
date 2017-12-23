'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _EventBase3 = require('./EventBase');

var _weixinApi = require('../common/functions/weixinApi');

var _Audio = require('./Audio');

var _AudioPlayer = require('./AudioPlayer');

var _Recorder = require('./Recorder');

var _Toast = require('./Toast');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DELETE_IMG_CLASS = 'ion-android-remove-circle';
var noop = function noop() {};

var Materials = function (_EventBase) {
    (0, _inherits3.default)(Materials, _EventBase);

    function Materials(elem, options) {
        (0, _classCallCheck3.default)(this, Materials);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Materials.__proto__ || (0, _getPrototypeOf2.default)(Materials)).call(this, elem));

        _this.options = options;
        return _this;
    }

    (0, _createClass3.default)(Materials, [{
        key: 'init',
        value: function init() {
            var self = this;
            var options = this.options;

            if (options.readonly) {
                this.container.addClass('readonly');
            }

            if (options.data) {
                options.data.forEach(function (item) {
                    self.addItem(item);
                });
            }

            self.bindEvents && self.bindEvents();

            this.container.on('click', '.' + DELETE_IMG_CLASS, function (e) {
                e.stopPropagation();
                $(this).closest('li').remove();
                self.count--;
            });
        }
    }, {
        key: 'readonly',
        value: function readonly() {
            var _readonly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (_readonly) {
                this.container.addClass('readonly');
            } else {
                this.container.removeClass('readonly');
            }
            this.options.readonly = _readonly;
        }
    }, {
        key: 'getData',
        value: function getData() {
            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

            this.getServerAndLocalIds();
            this.upload(callback);
        }
    }]);
    return Materials;
}(_EventBase3.EventBase);

var Images = function (_Materials) {
    (0, _inherits3.default)(Images, _Materials);

    function Images(elem, options) {
        (0, _classCallCheck3.default)(this, Images);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (Images.__proto__ || (0, _getPrototypeOf2.default)(Images)).call(this, elem, options));

        _this2.materialType = 'image';
        _this2.count = 0;
        _this2.init();
        return _this2;
    }

    (0, _createClass3.default)(Images, [{
        key: 'bindEvents',
        value: function bindEvents() {

            var self = this;

            this.container.on('click', 'img', function (e) {

                e.stopPropagation();

                var $this = $(this);
                var currentUrl = $this.prop('src');

                var imgsArr = self.getAllImages();

                if (+$this.data('islocal')) {
                    currentUrl = $this.data('localid');
                }
                _weixinApi.weixinApi.previewImage(currentUrl, imgsArr);
            });
        }
    }, {
        key: 'getAllImages',
        value: function getAllImages() {
            var self = this;

            self.getServerAndLocalIds();

            var imgsArr = self.localIds.concat(self.serverIds);
            var result = [];
            imgsArr.forEach(function (item) {
                result.push(item.localId || item.serverId || item.url);
            });
            return result;
        }
    }, {
        key: 'addItem',
        value: function addItem(item) {
            var isLocal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


            var url = item.url;
            var height = this.container.width() * 0.24;

            this.container.append('\n            <li>\n                <div class="item" style="background-image:url(' + url + ');height:' + height + '">\n                    <img src="' + url + '" data-localid="' + url + '" data-islocal="' + isLocal + '" data-sid="' + item.id + '"/>\n                    <i class="' + DELETE_IMG_CLASS + '"></i>\n                </div>\n            </li>\n        ');
            this.count++;
        }
    }, {
        key: 'getServerAndLocalIds',
        value: function getServerAndLocalIds() {
            var localIds = [];
            var serverIds = [];
            this.container.find('img').each(function (index, item) {

                var sid = $(item).data('sid');
                var localId = $(item).data('localid');

                var temp = {
                    width: item.naturalWidth,
                    height: item.naturalHeight
                };

                if (sid !== 'undefined') {
                    temp.id = sid;
                    temp.url = localId;
                    serverIds.push(temp);
                } else {
                    temp.localId = localId;
                    localIds.push(temp);
                }
            });

            this.localIds = localIds.reverse();
            this.serverIds = serverIds;
        }
    }, {
        key: 'upload',
        value: function upload() {
            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;


            var self = this;
            var localIds = this.localIds;
            var serverIds = this.serverIds;

            if (!localIds || !localIds.length) {
                callback(serverIds);
                return;
            }

            var item = localIds.pop();

            _weixinApi.weixinApi.uploadImage(item.localId, function (serverId) {

                serverIds.push({
                    serverId: serverId,
                    width: item.width,
                    height: item.height
                });

                self.upload(callback);
            });
        }
    }]);
    return Images;
}(Materials);

var Audios = function (_Materials2) {
    (0, _inherits3.default)(Audios, _Materials2);

    function Audios(elem, options) {
        (0, _classCallCheck3.default)(this, Audios);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (Audios.__proto__ || (0, _getPrototypeOf2.default)(Audios)).call(this, elem, options));

        _this3.materialType = 'audio';
        _this3.count = 0;
        _this3.init();
        return _this3;
    }

    (0, _createClass3.default)(Audios, [{
        key: 'addItem',
        value: function addItem(item) {
            var isLocal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


            var url = item.url;
            var seconds = item.seconds;

            var urlAttribute = '';
            var compType = '';
            if (isLocal) {
                urlAttribute = 'data-localid="' + url + '" ';
                compType = 'audio';
            } else {
                urlAttribute = 'data-url="' + url + '"';
                compType = 'audioplayer';
            }

            var tempElem = $('\n            <li>\n                <div class="component-' + compType + '" ' + urlAttribute + ' data-seconds="' + seconds + '" data-sid="' + item.id + '">\n                    <del class="' + DELETE_IMG_CLASS + '"></del>\n                </div>\n            </li>\n        ');

            if (compType === 'audio') {
                new _Audio.Audio(tempElem.children('.component-audio'));
            } else {
                new _AudioPlayer.AudioPlayer(tempElem.children('.component-audioplayer'), {
                    skin: 'weixin',
                    teimProgress: {}
                });
            }
            this.container.append(tempElem);
            this.count++;
        }
    }, {
        key: 'upload',
        value: function upload() {
            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;


            var self = this;
            var localIds = this.localIds;
            var serverIds = this.serverIds;

            if (!localIds || !localIds.length) {
                callback(serverIds);
                return;
            }

            var item = localIds.pop();

            _weixinApi.weixinApi.uploadVoice(item.localId, function (serverId) {

                serverIds.push({
                    serverId: serverId,
                    seconds: item.seconds
                });

                self.upload(callback);
            });
        }
    }, {
        key: 'getServerAndLocalIds',
        value: function getServerAndLocalIds() {
            var localIds = [];
            var serverIds = [];
            this.container.find('.component-audio,.component-audioplayer').each(function (index, item) {

                var $item = $(item);
                var sid = $item.data('sid');

                var temp = {
                    seconds: $item.data('seconds')
                };

                if (sid !== 'undefined') {
                    temp.id = sid;
                    temp.url = $item.data('url');
                    serverIds.push(temp);
                } else {
                    temp.localId = $item.data('localid');
                    localIds.push(temp);
                }
            });

            this.serverIds = serverIds;
            this.localIds = localIds.reverse();
        }
    }]);
    return Audios;
}(Materials);

var DEFAULT_EDITOR_OPTIONS = {
    imgs: {
        limit: 20
    },
    voices: {
        limit: 10
    },
    text: {
        limit: 1000
    },
    data: {
        content: ''
    }
};

var RichEditor = function (_EventBase2) {
    (0, _inherits3.default)(RichEditor, _EventBase2);

    function RichEditor(elem) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        (0, _classCallCheck3.default)(this, RichEditor);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, (RichEditor.__proto__ || (0, _getPrototypeOf2.default)(RichEditor)).call(this, elem));

        var tempOptions = {};
        $.extend(true, tempOptions, DEFAULT_EDITOR_OPTIONS);
        $.extend(true, tempOptions, options);

        _this4.options = tempOptions;
        _this4.init();
        return _this4;
    }

    (0, _createClass3.default)(RichEditor, [{
        key: 'init',
        value: function init() {

            var self = this;
            var container = self.container;
            var options = self.options;

            if (options.readonly) {
                container.addClass('readonly');
            }
            container.html(self.getTemplate());

            self.imgButton = container.find('.icon-camera');
            self.voiceButton = container.find('.icon-mic');
            self.textBox = container.children('.component-richeditor-text');
            self.textFaker = container.children('.component-richeditor-faker');

            self.imagesComponent = new Images(container.children('.component-richeditor-imgs'), $.extend(options.imgs, {
                readonly: options.readonly,
                data: options.data.imgs
            }));
            self.audiosComponent = new Audios(container.children('.component-richeditor-audios'), $.extend(options.voices, {
                readonly: options.readonly,
                data: options.data.voices
            }));

            self.recorder = new _Recorder.Recorder({
                success: function success(localId, seconds) {
                    self.recordPanelOpened = false;

                    if (seconds === 0) {
                        return;
                    }
                    self.audiosComponent.addItem({
                        url: localId,
                        seconds: seconds
                    }, 1);
                }
            });

            if (options.readonly) {
                self.readonly(true);
            }

            self.bindEvents();
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {
            var options = this.options;
            options.data.content = options.data.content || '';

            var buttonsTemplate = [];

            if (options.imgs && !options.imgs.disabled) {
                buttonsTemplate.push('<button data-opttype="add-img" class="icon-camera" type="button">图</button>');
            }

            return '\n            <div class="component-richeditor-text" contenteditable="' + !options.readonly + '">' + options.data.content + '</div>\n            <ol class="component-richeditor-audios">\n            </ol>\n            <ul class="component-richeditor-imgs">\n            </ul>\n            <div class="component-richeditor-btns">\n                ' + buttonsTemplate.join('') + '\n                <button data-opttype="add-voice" type="button" class="icon-mic">\u97F3</button>\n            </div>\n        ';
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {

            var editor = this;
            var options = this.options;

            editor.container.on('click', 'button', function (e) {
                var $this = $(this);
                var opttype = $this.data('opttype');
                var leftedCount = 8;

                if (opttype === 'add-img') {
                    leftedCount = options.imgs.limit - editor.imagesComponent.count;
                    if (leftedCount > 0) {
                        editor.chooseImage(leftedCount > 9 ? 9 : leftedCount);
                    } else {
                        alert('最多上传' + options.imgs.limit + '张图片');
                    }
                } else if (opttype === 'add-voice') {

                    leftedCount = options.voices.limit - editor.audiosComponent.count;
                    if (leftedCount <= 0) {
                        alert('最多上传' + options.voices.limit + '条语音');
                        return;
                    }

                    if (editor.recordPanelOpened) {
                        editor.closeRecordPanel();
                    } else {
                        editor.openRecordPanel();
                    }
                }
            });
        }
    }, {
        key: 'chooseImage',
        value: function chooseImage() {
            var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;

            var editor = this;
            _weixinApi.weixinApi.chooseImage(limit, function (localIds) {
                localIds.forEach(function (item) {
                    editor.imagesComponent.addItem({
                        url: item
                    }, 1);
                });
            });
        }
    }, {
        key: 'openRecordPanel',
        value: function openRecordPanel() {
            this.recordPanelOpened = true;
            this.recorder.show();
        }
    }, {
        key: 'closeRecordPanel',
        value: function closeRecordPanel() {
            this.recordPanelOpened = false;
            this.recorder.hide();
        }
    }, {
        key: 'upload',
        value: function upload() {
            var editor = this;
            (0, _Toast.loading)();
            editor.imagesComponent.getData(function (imgs) {
                editor.audiosComponent.getData(function (audios) {
                    (0, _Toast.unloading)();
                    editor.uploaded && editor.uploaded(imgs, audios, editor.textBox.html());
                });
            });
        }
    }, {
        key: 'readonly',
        value: function readonly() {
            var _readonly2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var editor = this;
            var options = editor.options;

            editor.textBox.prop('contenteditable', !_readonly2);
            editor.imagesComponent.readonly(_readonly2);
            editor.audiosComponent.readonly(_readonly2);

            if (_readonly2) {
                editor.imgButton.hide();
                editor.voiceButton.hide();
                editor.container.addClass('readonly');
            } else {
                editor.imgButton.show();
                editor.voiceButton.show();
                editor.container.removeClass('readonly');
            }

            options.readonly = _readonly2;
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.textBox.focus();
        }
    }, {
        key: 'getHtml',
        value: function getHtml() {
            return this.textBox.html();
        }
    }, {
        key: 'setHtml',
        value: function setHtml(content) {
            this.textBox.html(content);
        }
    }]);
    return RichEditor;
}(_EventBase3.EventBase);

exports.default = RichEditor;
//# sourceMappingURL=RichEditor.js.map
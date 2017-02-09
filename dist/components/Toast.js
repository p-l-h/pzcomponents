'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.toast = toast;
exports.untoast = untoast;
exports.loading = loading;
exports.unloading = unloading;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toast = function () {
    function Toast() {
        (0, _classCallCheck3.default)(this, Toast);

        this.init();
    }

    (0, _createClass3.default)(Toast, [{
        key: 'init',
        value: function init() {

            this.main = $(this.getTemplate());
            $(document.body).append(this.main);

            this.contentElem = this.main.children('.toast-content');
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {
            return '\n            <div class="toast">\n                <div class="toast-content">\n                </div>\n            </div>\n        ';
        }
    }, {
        key: 'show',
        value: function show(useTimer) {
            var self = this;
            self.main.show();

            if (useTimer) {
                window.setTimeout(function () {
                    self.hide();
                }, 1000);
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.main.hide();
        }
    }, {
        key: 'setContent',
        value: function setContent(content) {
            this.contentElem.html(content);
        }
    }, {
        key: 'setSkin',
        value: function setSkin(skin) {
            this.contentElem.removeClass(this.lastClassName || '').addClass(skin);

            this.lastClassName = skin;
        }
    }]);
    return Toast;
}();

var _toast = new Toast();

function toast() {
    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var skin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'black';
    var useTimer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


    _toast.setContent(content);
    _toast.setSkin(skin);

    _toast.show(useTimer);
}

function untoast() {
    _toast.hide();
}

var _loading = new Toast();
_loading.setSkin('black');
_loading.setContent('\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" fill="white">\n  <circle cx="16" cy="3" r="0">\n    <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />\n  </circle>\n  <circle transform="rotate(45 16 16)" cx="16" cy="3" r="0">\n    <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.125s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />\n  </circle>\n  <circle transform="rotate(90 16 16)" cx="16" cy="3" r="0">\n    <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.25s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />\n  </circle>\n  <circle transform="rotate(135 16 16)" cx="16" cy="3" r="0">\n    <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.375s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />\n  </circle>\n  <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">\n    <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />\n  </circle>\n  <circle transform="rotate(225 16 16)" cx="16" cy="3" r="0">\n    <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.625s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />\n  </circle>\n  <circle transform="rotate(270 16 16)" cx="16" cy="3" r="0">\n    <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.75s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />\n  </circle>\n  <circle transform="rotate(315 16 16)" cx="16" cy="3" r="0">\n    <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.875s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />\n  </circle>\n  <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">\n    <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />\n  </circle>\n</svg>\n');

function loading() {
    _loading.show(false);
}

function unloading() {
    _loading.hide();
}
//# sourceMappingURL=Toast.js.map
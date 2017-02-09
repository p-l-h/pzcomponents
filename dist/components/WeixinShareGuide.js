'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.weixinShareGuide = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WEIXIN_SHARE_GUIDE = '\n    <div class="share-guide">\n        <img src="http://img.gsxservice.com/14554196_kggv8sac.png" />\n        <div class="share-guide-text">\n            <p>请点击右上角将作业分享给好友或朋友圈</p>\n        </div>\n    </div>\n';

var $weixinShareGuide = $(WEIXIN_SHARE_GUIDE);

var weixinShareGuide = exports.weixinShareGuide = function () {
    function weixinShareGuide() {
        (0, _classCallCheck3.default)(this, weixinShareGuide);

        this.init();
    }

    (0, _createClass3.default)(weixinShareGuide, [{
        key: 'init',
        value: function init() {
            var self = this;
            $(document.body).append($weixinShareGuide);

            $weixinShareGuide.on('click', function () {
                self.hide();
            });
        }
    }, {
        key: 'show',
        value: function show() {
            $weixinShareGuide.show();
        }
    }, {
        key: 'hide',
        value: function hide() {
            $weixinShareGuide.hide();
        }
    }]);
    return weixinShareGuide;
}();
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WeixinShareGuide = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WEIXIN_SHARE_GUIDE = '\n    <div class="component-weixinshare-guide">\n        <img src="http://img.gsxservice.com/14554196_kggv8sac.png" />\n        <div class="component-weixinshare-guide-text"></div>\n    </div>\n';

var $weixinShareGuide = $(WEIXIN_SHARE_GUIDE);

var WeixinShareGuide = exports.WeixinShareGuide = function () {
    function WeixinShareGuide() {
        (0, _classCallCheck3.default)(this, WeixinShareGuide);

        this.init();
    }

    (0, _createClass3.default)(WeixinShareGuide, [{
        key: 'init',
        value: function init() {
            var self = this;
            $(document.body).append($weixinShareGuide);

            $weixinShareGuide.on('click', function () {
                self.hide();
            });
        }
    }, {
        key: 'setContent',
        value: function setContent(html) {
            $weixinShareGuide.find('.component-weixinshare-guide-text').html('<div>' + html + '</div>');
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
    return WeixinShareGuide;
}();
//# sourceMappingURL=WeixinShareGuide.js.map
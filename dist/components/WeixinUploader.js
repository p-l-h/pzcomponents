'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Uploader = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _request = require('../common/functions/request');

var _weixinApi = require('../common/functions/weixinApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Uploader = exports.Uploader = function () {
    function Uploader(trigger, options) {
        (0, _classCallCheck3.default)(this, Uploader);

        this.trigger = trigger;
        this.options = options;
        this.init();
    }

    (0, _createClass3.default)(Uploader, [{
        key: 'init',
        value: function init() {
            var self = this;
            var options = self.options;

            self.trigger.on('click', function () {
                _weixinApi.weixinApi.chooseImage(1, function (localIds) {
                    var img = new Image();

                    img.onload = function () {
                        _weixinApi.weixinApi.uploadImage(localIds[0], function (serverId) {
                            options.success && options.success({
                                serverId: serverId,
                                width: img.width,
                                height: img.height
                            });
                        });
                    };

                    img.src = localIds[0];
                });
            });
        }
    }]);
    return Uploader;
}();
//# sourceMappingURL=WeixinUploader.js.map
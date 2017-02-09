'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IssueItem = undefined;

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

var _EventBase2 = require('./EventBase');

var _EventBase3 = _interopRequireDefault(_EventBase2);

var _Audio = require('./Audio');

var _Audio2 = _interopRequireDefault(_Audio);

var _weixinApi = require('../common/functions/weixinApi');

var _weixinApi2 = _interopRequireDefault(_weixinApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IssueItem = exports.IssueItem = function (_EventBase) {
    (0, _inherits3.default)(IssueItem, _EventBase);

    function IssueItem(container, options) {
        (0, _classCallCheck3.default)(this, IssueItem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (IssueItem.__proto__ || (0, _getPrototypeOf2.default)(IssueItem)).call(this, container));

        _this.options = options;
        _this.init();
        return _this;
    }

    (0, _createClass3.default)(IssueItem, [{
        key: 'init',
        value: function init() {
            this.initComponent();
            this.initEvents();
        }
    }, {
        key: 'initComponent',
        value: function initComponent() {
            this.initAudios();
            this.initImages();
        }
    }, {
        key: 'initAudios',
        value: function initAudios() {
            this.container.find('.component-audio').each(function (index, item) {
                new _Audio2.default($(item));
            });
        }
    }, {
        key: 'initImages',
        value: function initImages() {
            var result = [];
            this.imgList = this.container.children('.issue-detail-imgs');
            this.imgList.find('img').each(function (item) {
                result.push(item.src);
            });

            this.imgSources = result;
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            var that = this;
            that.imageList.on('click', 'img', function (e) {
                _weixinApi2.default.previewImage(item.src, that.imgSources);
            });
        }
    }]);
    return IssueItem;
}(_EventBase3.default);
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SearchBar = undefined;

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

var _request = require('../common/functions/request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchBar = exports.SearchBar = function (_EventBase) {
    (0, _inherits3.default)(SearchBar, _EventBase);


    /**
     * Creates an instance of SearchBar.
     *
     * @param {ZeptoElem} container 容器
     * @param {Object} options 配置项
     * @property {string} options.method GET OR POST
     * @property {string} options.action 要请求的url
     * @property {Function} options.getParams 获取查询参数
     * @property {Function} options.searched 搜索结束之后
     */

    function SearchBar(container, options) {
        (0, _classCallCheck3.default)(this, SearchBar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SearchBar.__proto__ || (0, _getPrototypeOf2.default)(SearchBar)).call(this, container));

        _this.options = options;
        _this.init();
        return _this;
    }

    (0, _createClass3.default)(SearchBar, [{
        key: 'init',
        value: function init() {
            this.container.html(this.getTemplate());

            this.searchInput = this.container.find('input[type="search"]');
            this.searchForm = this.container.find('form');

            this.initEvents();
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {

            var options = this.options;
            return '\n            <form class="component-searchbar-form" action="' + options.action + '" method="' + options.method + '">\n                <div class="component-searchbar-input">\n                    <input type="search" name="' + options.field + '" placeholder="' + (options.placeholder || '') + '"/>\n                </div>\n                <button type="submit" class="ion-ios-search"></button>\n            </form>\n        ';
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {

            var self = this;
            var options = self.options;

            self.searchForm.on('submit', function (e) {

                e.preventDefault();

                var postData = {};
                postData[options.field] = self.searchInput.val().trim();

                if (options.getParams) {
                    postData = options.getParams(postData);
                }

                (0, _request.postJson)(options.action, postData, function (data) {
                    options.searched.call(self, data);
                });
            }).on('click', function (e) {
                self.focus();
            });

            $(document).on('click', function (e) {
                var form = self.searchForm[0];

                if (!$.contains(form, e.target)) {
                    self.blur();
                }
            });
        }

        /**
         * 激活searchbar
         *
         * @param {Boolean} selfTrigger 是否是由输入框触发的
         */

    }, {
        key: 'focus',
        value: function focus(selfTrigger) {
            this.active = true;
            this.container.addClass('active');
            !selfTrigger && this.searchInput.focus();
        }

        /**
         * 移除searchbar 的激活状态
         *
         * @param {Boolean} selfTrigger 是否是由输入框触发的
         */

    }, {
        key: 'blur',
        value: function blur(selfTrigger) {
            this.active = false;
            this.container.removeClass('active');
            !selfTrigger && this.searchInput.blur();
        }
    }]);
    return SearchBar;
}(_EventBase2.EventBase);
//# sourceMappingURL=SearchBar.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ListBase = undefined;

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

var _listenToScroll = require('../common/functions/listenToScroll');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListBase = function (_EventBase) {
    (0, _inherits3.default)(ListBase, _EventBase);

    function ListBase(container, options) {
        (0, _classCallCheck3.default)(this, ListBase);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ListBase.__proto__ || (0, _getPrototypeOf2.default)(ListBase)).call(this, container));

        _this.options = options;
        _this.listData = [];
        _this.init();
        return _this;
    }

    (0, _createClass3.default)(ListBase, [{
        key: 'init',
        value: function init() {
            this.fetchData(this.options.defaultParams, this.options.clearAtInitial);
            this.initEvents();
        }
    }, {
        key: 'fetchData',
        value: function fetchData(params, clear) {
            var list = this;
            var options = list.options;

            var requestParams = {};
            $.extend(requestParams, options.defaultParams);
            $.extend(requestParams, params);

            if (clear) {
                list.clear();
            }

            (0, _request.getJson)(options.url, requestParams, function (data) {

                data = data || {};

                if (options.processData) {
                    data = options.processData(data);
                }

                list.container.append(options.template.render(data));

                list.trigger('appended', data);
            });
        }
    }, {
        key: 'addListData',
        value: function addListData(list) {

            var listData = this.listData;

            if (!list) {
                return;
            }

            list.forEach(function (item) {
                listData.push(item);
            });
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {

            var list = this;
            var options = list.options;

            var $window = $(window);
            var $body = $(document.body);

            if (options.autoLoad) {
                list.on('scrollToBottom', function () {
                    if (list.container.css('display') === 'none') {
                        return;
                    }
                    list.fetchData({
                        pageNum: ++options.defaultParams.pageNum
                    });
                });
                list.on('loadMore', function () {
                    list.fetchData({
                        pageNum: ++options.defaultParams.pageNum
                    });
                });
            }

            if (list.options.loadMoreByHand) {
                var loadMoreElem = $(list.options.loadMoreTemplate || '<li class="more">查看更多</li>');

                loadMoreElem.on('click', function () {
                    list.trigger('loadMore');
                });
                list.loadMoreElem = loadMoreElem;
            } else {
                (0, _listenToScroll.listenToScroll)($window, function (evt) {

                    if (evt.direction === 'up') {
                        return;
                    }

                    if (list.nomoreData) {
                        return;
                    }

                    var screenHeight = $window.height();
                    var bodyHeight = $body.height();
                    var scrollTop = $body.scrollTop();

                    if (bodyHeight - scrollTop - 10 < screenHeight) {
                        list.trigger('scrollToBottom');
                    }
                });
            }
        }
    }, {
        key: 'nomore',
        value: function nomore(_nomore) {
            var list = this;

            list.nomoreData = !!_nomore;

            if (_nomore && list.options.loadMoreByHand) {
                list.loadMoreElem.remove();
            } else if (!_nomore && list.options.loadMoreByHand) {
                list.loadMoreElem.appendTo(list.container);
            }
        }
    }, {
        key: 'getListData',
        value: function getListData() {
            return this.listData;
        }
    }, {
        key: 'reload',
        value: function reload() {
            this.fetchData(null, true);
        }
    }, {
        key: 'setOptions',
        value: function setOptions(options) {

            $.extend(this.options, options);
            this.fetchData(this.options.defaultParams, true);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.listData = [];
            this.container.html('');
        }
    }]);
    return ListBase;
}(_EventBase2.EventBase);

exports.ListBase = ListBase;
//# sourceMappingURL=ListBase.js.map
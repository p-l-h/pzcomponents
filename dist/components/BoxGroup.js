'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BoxGroup = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BoxGroup = exports.BoxGroup = function (_EventBase) {
    (0, _inherits3.default)(BoxGroup, _EventBase);

    function BoxGroup(container, options) {
        (0, _classCallCheck3.default)(this, BoxGroup);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BoxGroup.__proto__ || (0, _getPrototypeOf2.default)(BoxGroup)).call(this, container));

        _this.options = options;
        _this.init();
        return _this;
    }

    (0, _createClass3.default)(BoxGroup, [{
        key: 'init',
        value: function init() {
            this.container.html(this.getTemplate());
            this.boxes = this.container.find('input[type="checkbox"]');
            this.initEvents();
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {

            var group = this;
            var options = group.options;
            var container = group.container;
            var klass = options.klass || {};

            container.on('click', 'input[type="checkbox"]', function () {
                var target = this;
                var $target = $(target);
                var $parent = $target.parent();

                if (options.mode === 'single') {

                    if (!target.checked) {
                        return;
                    }
                    group.boxes.each(function (index, item) {
                        if (item !== target) {
                            item.checked = false;
                            if (klass.active) {
                                $(item).parent().removeClass(klass.active).addClass(klass.normal);
                            }
                        }
                    });
                }

                if (klass.active) {
                    if (target.checked) {
                        $parent.addClass(klass.active).removeClass(klass.normal);
                    } else {
                        $parent.removeClass(klass.active).addClass(klass.normal);
                    }
                }

                group.trigger('changed');
            });
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {
            var result = [];
            var options = this.options;
            var klass = options.klass || {};
            var dataSource = options.dataSource;
            dataSource.forEach(function (item, index) {
                if ((typeof item === 'undefined' ? 'undefined' : (0, _typeof3.default)(item)) !== 'object') {

                    dataSource[index] = {
                        value: index,
                        label: item
                    };
                    item = dataSource[index];
                }

                result.push('\n                    <label class="' + klass.normal + '">\n                        <input name="' + options.name + '" type="checkbox" value="' + item.value + '"/>\n                        ' + item.label + '\n                    </label>\n                ');
            });

            return result.join('');
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            var result = [];
            var dataSource = this.options.dataSource;
            this.boxes.each(function (index, item) {
                if (item.checked) {
                    result.push(dataSource[index]);
                }
            });

            return result;
        }
    }, {
        key: 'changeMode',
        value: function changeMode(mode) {
            var options = this.options;
            if (mode === options.mode) {
                return;
            } else if (mode === 'single') {
                this.boxes.each(function (index, item) {
                    item.checked = false;
                    $(item).parent().removeClass(options.klass.active);
                });
                this.trigger('changed');
            }

            this.options.mode = mode;
        }
    }]);
    return BoxGroup;
}(_EventBase2.EventBase);
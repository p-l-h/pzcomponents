'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DateTimePicker = undefined;

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

var DateTimePicker = exports.DateTimePicker = function (_EventBase) {
    (0, _inherits3.default)(DateTimePicker, _EventBase);

    function DateTimePicker(container, options) {
        (0, _classCallCheck3.default)(this, DateTimePicker);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DateTimePicker.__proto__ || (0, _getPrototypeOf2.default)(DateTimePicker)).call(this, container));

        _this.options = options;
        _this.init();
        return _this;
    }

    (0, _createClass3.default)(DateTimePicker, [{
        key: 'init',
        value: function init() {
            this.container.html(this.getTemplate());
            this.input = this.container.find('input[type="datetime-local"]');
            this.shower = this.input.prev();
            this.bindEvents();
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {
            var options = this.options;
            var datepickerInput = '\n            <input type="datetime-local" name="' + options.name + '" />\n        ';

            if ($.os.phone) {
                this.useFaker = true;
                return '\n                <div class="component-datetimepicker-faker">\n                    <em>' + options.placeholder + '</em>\n                    ' + datepickerInput + '\n                </div>\n            ';
            } else {
                return datepickerInput;
            }
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var inputer = this;

            inputer.input.on('input', function (e) {

                if (inputer.useFaker) {

                    inputer.shower.html(this.value);
                }
            });
        }
    }]);
    return DateTimePicker;
}(_EventBase2.EventBase);
//# sourceMappingURL=DateTimeInput.js.map
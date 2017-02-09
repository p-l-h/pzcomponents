'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DropDown = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $window = $(window);

var DropDown = exports.DropDown = function () {
    function DropDown(options) {
        (0, _classCallCheck3.default)(this, DropDown);

        this.options = options;
        this.init();
    }

    (0, _createClass3.default)(DropDown, [{
        key: 'init',
        value: function init() {
            var self = this;
            self.main = self.getMain();

            var events = self.options.events;

            self.main.on('click', 'button', function () {
                var opttype = $(this).data('opttype');

                var currentEventHandler = events[opttype];

                currentEventHandler && currentEventHandler.call(this);
            });

            self.main.appendTo($(document.body));

            $(document.body).on('click', function (e) {
                if (!$.contains(self.main[0], e.target)) {
                    self.hide();
                }
            });
        }
    }, {
        key: 'getMain',
        value: function getMain() {
            return $(this.getTemplate());
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {
            var result = ['<div class="component-dropdown"><ul>'];
            var self = this;
            self.options.actions.forEach(function (item) {
                result.push(self.getItemTemplate(item));
            });

            result.push('</ul>');

            return result.join('');
        }
    }, {
        key: 'getItemTemplate',
        value: function getItemTemplate(item) {
            return '\n            <li><button data-opttype="' + item.opttype + '">' + item.text + '</button></li>\n        ';
        }
    }, {
        key: 'attachTo',
        value: function attachTo(elem) {

            var self = this;
            var options = self.options;

            options.position = options.position || 'left';

            // let scrollTop = $window.scrollTop();
            // let scrollLeft = $window.scrollLeft();
            var windowWidth = $window.width();
            var bodyHeight = $(document.body).height();
            var offset = elem.offset();

            var position = {};

            switch (options.position) {
                case 'left':
                    position.right = windowWidth - offset.left;
                    position.top = offset.top + offset.height / 2;
                    break;
                case 'top':
                    position.bottom = bodyHeight - offset.top;
                    position.left = offset.left;
                    break;
                case 'right':
                    position.top = offset.top;
                    position.right = offset.left + offset.width;
                    break;
                case 'bottom':
                    position.top = offset.top + offset.height;
                    position.left = offset.left;
                    break;
                default:
                    break;
            }
            self.main.addClass('component-dropdown-' + options.position);
            self.setPosition(position);
        }
    }, {
        key: 'setPosition',
        value: function setPosition(pos) {
            var self = this;
            self.coordinate = pos;

            var css = {};
            for (var key in pos) {
                css[key] = pos[key] + 'px';
            }

            self.main.css(css);
        }
    }, {
        key: 'getPosition',
        value: function getPosition() {
            return this.coordinate;
        }
    }, {
        key: 'show',
        value: function show() {
            this.main.show();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.main.hide();
        }
    }]);
    return DropDown;
}();
//# sourceMappingURL=DropDown.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.promptInput = exports.prompt = exports.confirm = exports.alert = exports.Popup = exports.Dialog = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Panel = require('./Panel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dialog = exports.Dialog = function () {
    function Dialog(options) {
        (0, _classCallCheck3.default)(this, Dialog);

        this.options = options;
        this.init();
    }

    (0, _createClass3.default)(Dialog, [{
        key: 'init',
        value: function init() {
            var self = this;
            var options = self.options;

            self.panel = new _Panel.Panel({
                inner: self.getMain(),
                closeOnTouchBlack: true
            });

            options.bindEvents && options.bindEvents.apply(self);
        }
    }, {
        key: 'getMain',
        value: function getMain() {
            this.main = $(this.getTemplate());
            return this.main;
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {

            var self = this;
            var options = self.options;

            var titleHtml = '\n            <div class="' + self.getClass('title') + '">' + (options.title || '') + '</div>\n        ';

            var bodyHtml = '\n                <div class="' + self.getClass('body') + '">' + (options.body || '') + '</div>\n            ';

            var footerHtml = '\n            <div class="' + self.getClass('footer') + '">' + (options.footer || '') + '</div>\n        ';

            return '\n            <div class="' + self.getClass() + ' ' + options.skin + '">\n                ' + titleHtml + bodyHtml + footerHtml + '\n            </div>\n        ';
        }
    }, {
        key: 'setBody',
        value: function setBody(content) {
            this.main.find('.' + this.getClass('body')).html(content);
        }
    }, {
        key: 'setTitle',
        value: function setTitle(title) {
            this.main.find('.' + this.getClass('title')).html(title);
        }
    }, {
        key: 'show',
        value: function show() {
            this.panel.show();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.panel.hide();
        }
    }, {
        key: 'getClass',
        value: function getClass(suffix) {
            return 'component-dialog' + (suffix ? '-' + suffix : '');
        }
    }]);
    return Dialog;
}();

var Popup = exports.Popup = function (_Dialog) {
    (0, _inherits3.default)(Popup, _Dialog);

    function Popup(options) {
        (0, _classCallCheck3.default)(this, Popup);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Popup.__proto__ || (0, _getPrototypeOf2.default)(Popup)).call(this, options));

        _this.handlers = {};
        _this.bindEvents();
        return _this;
    }

    (0, _createClass3.default)(Popup, [{
        key: 'bindEvents',
        value: function bindEvents() {
            var self = this;
            $(self.main).find('.' + self.getClass('footer')).on('click', 'button', function (e) {

                var opttype = $(this).data('opttype');

                if (opttype) {
                    self.callHandler(opttype);
                }
            });
        }
    }, {
        key: 'addHandler',
        value: function addHandler(opttype, handler) {
            var autoRemove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var self = this;
            var handlers = self.handlers;

            handlers[opttype] = handlers[opttype] || [];
            handler.autoRemove = autoRemove;
            handlers[opttype].push(handler);
            return self;
        }
    }, {
        key: 'removeHandler',
        value: function removeHandler(opttype, handler) {
            var handlers = this.handlers;

            if (handler) {
                handlers[opttype].forEach(function (item, index) {
                    if (item === handler) {
                        handlers[opttype][index] = null;
                    }
                });
            } else {
                handlers[opttype] = [];
            }
        }
    }, {
        key: 'callHandler',
        value: function callHandler(opttype) {
            var self = this;
            var handlers = self.handlers;

            handlers[opttype].forEach(function (item) {
                if (item) {
                    item.apply(self);

                    if (item.autoRemove) {
                        self.removeHandler(opttype, item);
                    }
                }
            });
        }
    }]);
    return Popup;
}(Dialog);

var alertDialog = new Popup({
    footer: '\n        <button type="button" data-opttype="ok">好</button>\n    ',
    skin: 'alert'
});

alertDialog.addHandler('ok', function () {
    this.hide();
}, false);

var alert = exports.alert = function alert(content) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    alertDialog.setBody(content);
    alertDialog.setTitle(title);
    alertDialog.show();

    return alertDialog;
};

var confirmDialog = new Popup({
    footer: '\n        <button type="button" class="btn-default btn" data-opttype="no">否</button>\n        <button type="button" class="btn-primary btn" data-opttype="yes">是</button>\n    ',
    skin: 'confirm'
});

confirmDialog.addHandler('no', function () {
    this.hide();
}, false);

var confirm = exports.confirm = function confirm(content) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    confirmDialog.setBody(content);
    confirmDialog.setTitle(title);
    confirmDialog.show();

    return confirmDialog;
};

var promptDialog = new Popup({
    footer: '\n        <button type="button" class="btn-default btn" data-opttype="no">取消</button>\n        <button type="button" class="btn-primary btn" data-opttype="yes">确定</button>\n    ',
    skin: 'prompt'
});
promptDialog.addHandler('no', function () {
    this.hide();
}, false);

var prompt = exports.prompt = function prompt(placeholder) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    promptDialog.setBody('<textarea rows="4" placeholder="' + placeholder + '"></textarea>');
    promptDialog.setTitle(title);
    promptDialog.show();

    return promptDialog;
};

var promptInput = exports.promptInput = function promptInput(value) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    promptDialog.setBody('<input type="text" value="' + value + '"/>');
    promptDialog.setTitle(title);
    promptDialog.show();

    return promptDialog;
};
//# sourceMappingURL=Dialog.js.map
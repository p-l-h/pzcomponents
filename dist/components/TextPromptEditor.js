'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Dialog = require('./Dialog');

var _Toast = require('./Toast');

var _request = require('../common/functions/request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextPromptEditor = function () {
    function TextPromptEditor(trigger, options) {
        (0, _classCallCheck3.default)(this, TextPromptEditor);

        this.trigger = trigger;
        this.options = options;
        this.init();
    }

    (0, _createClass3.default)(TextPromptEditor, [{
        key: 'init',
        value: function init() {

            var self = this;
            var options = self.options;

            self.promptDialog = (0, _Dialog.promptInput)(options.originValue, options.tip);
            self.promptDialog.hide();
            self.promptDialog.addHandler('yes', function () {
                var dlg = this;

                var val = dlg.main.find('input[type="text"]').val().trim();
                var error = options.validateError && options.validateError(val);

                if (error) {
                    (0, _Toast.toast)(error);
                    return;
                }

                options.success && options.success(val, dlg);
            }, false);

            self.trigger.on('click', function () {
                self.promptDialog.show();
            });
        }
    }]);
    return TextPromptEditor;
}();

exports.default = TextPromptEditor;
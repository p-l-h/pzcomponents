

import {promptInput} from './Dialog';
import {toast} from './Toast';
import {postJson} from '../common/functions/request';



export default class TextPromptEditor {
    constructor(trigger, options) {
        this.trigger = trigger;
        this.options = options;
        this.init();
    }

    init(){

        let self = this;
        let options = self.options;


        self.promptDialog = promptInput(options.originValue, options.tip);
        self.promptDialog.hide();
        self.promptDialog.addHandler('yes', function () {
            let dlg = this;

            let val = dlg.main.find('input[type="text"]').val().trim();
            let error = options.validateError && options.validateError(val);

            if (error) {
                toast(error);
                return;
            }

            options.success && options.success(val, dlg);

        }, false);
    

        
        self.trigger.on('click', function () {
            self.promptDialog.show();        
        });
    }
}
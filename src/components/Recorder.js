
import {Panel} from './Panel';

import { weixinApi } from '../common/functions/weixinApi';

export default class Recorder {
    constructor(options) {
        this.options = options;
        this.init();
    }

    init() {

        let self = this;

        self.main = $(self.getTemplate());
        self.panel = new Panel({
            inner: self.main
        });
        self.counterEm = self.main.find('em');

        self.bindEvents();
    }

    getTemplate() {
        return `
            <div class="component-recorder">
                <div class="component-recorder-text">点击录音</div>
                <div class="component-recorder-text active"><em>0</em>s/60s</div>
                <button type="button"></button>
            </div>
        `;
    }

    bindEvents() {
        let self = this;
        let main = self.main;

        main.on('click', 'button', (e) => {

            if (self.recording && self.timeCounter < 1) {
                return;
            }

            if (self.recording) {
                self.stopRecord();
            }
            else {
                self.startRecord();
            }
        });
    }

    startRecord() {
        let self = this;
        self.recording = true;
        weixinApi.startRecord();
        self.main.addClass('active');
        self.counterEm.html(0);

        self.startRecordTimer();

        weixinApi.onVoiceRecordEnd(
            function (localId) {
                self.voiceRecorded(localId, 60);
                self.timeCounter = 0;
            }
        );
    }

    stopRecord() {
        let self = this;

        weixinApi.stopRecord(
            function(localId) {
                self.voiceRecorded(localId, self.timeCounter);
            }
        );
    }

    startRecordTimer() {
        let self = this;
        self.timeCounter = 0;
        self.recordInterval = window.setInterval(
            function () {
                self.timeCounter++;
                self.counterEm.html(self.timeCounter);
            },
            1000
        );
    }

    voiceRecorded(localId, seconds) {
        let self = this;
        let options = self.options;
        window.clearInterval(self.recordInterval);
        self.recording = false;
        self.hide();


        if (options.success) {
            options.success(localId, seconds);
        }
    }

    show() {
        this.main.removeClass('active');
        this.panel.show();
    }

    hide() {
        this.panel.hide();
    }

}

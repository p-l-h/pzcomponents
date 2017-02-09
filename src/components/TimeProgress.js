


import {Progress} from './Progress';


export class TimeProgress {

    /**
     * Creates an instance of TimeProgress.
     * 示例options
     * {
     *    total: 60,
     *    value: 30
     * }
     * @param {ZeptoElelent} container
     * @param {Object} options
     *
     */
    constructor(container, options) {
        this.container = container;
        this.options = options;
        this.init();
    }


    init() {

        let self = this;
        self.container.html(self.getTemplate());

        if (self.options.skin) {
            self.container.addClass('skin-' + self.options.skin);
        }

        self.progress = new Progress(
            self.container.find('.component-progress'),
            {
                value: self.calculateProgress(),
                skin: self.options.skin
            }
        );

        self.progress.setDragCallback(
            function (percent) {
                if (percent > 100) {
                    percent = 100;
                }

                let currentTime = self.options.total * percent / 100;

                if (self.valueUpdatedByHand) {
                    self.valueUpdatedByHand.call(this, currentTime);
                }
                else {
                    self.setValue(currentTime);

                }
            }
        );

        self.currentTimeElem = self.container.children('em');
        self.totalTimeElem = self.container.children('strong');

    }

    getTemplate() {
        let self = this;
        return `
            <em>${self.formatSeconds(self.options.value)}</em>
            <div class="component-progress">
            </div>
            <strong>${self.formatSeconds(self.options.total)}</strong>
        `;
    }

    setValue(val) {

        val = val || 0;
        let self = this;

        self.options.value = val;
        self.updateProgress();
        self.currentTimeElem.html(self.formatSeconds(val));
    }

    setTotal(total) {
        let self = this;
        if(total === self.options.total) {
            return;
        }
        self.options.total = total;
        self.totalTimeElem.html(self.formatSeconds(total));
    }

    calculateProgress() {
        let self = this;
        return ((self.options.value / self.options.total) * 100).toFixed(2);
    }

    updateProgress() {
        let self = this;
        self.progress.setValue(self.calculateProgress());
    }

    setValueUpdatedByHand(callback) {
        this.valueUpdatedByHand = callback;
    }

    formatSeconds(seconds) {
        let minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return minutes + ':' + seconds;
    }
}

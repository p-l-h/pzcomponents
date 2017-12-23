

import {Panel} from './Panel';

export class ActionPanel {
    constructor(options) {
        this.options = options;
        this.init();
    }

    init() {
        let self = this;
        self.main = self.getMain();
        let events = self.options.events;
        let currentCancelEvent = events.cancel;
        events.cancel = () => {
            currentCancelEvent && currentCancelEvent.apply(this);
            self.hide();
        };
        self.main.on('click', 'button', function () {
            let opttype = $(this).data('opttype');
            let currentEventHandler = events[opttype];
            currentEventHandler && currentEventHandler.call(this);
        });
        self.panel = new Panel({
            inner: self.main,
            closeOnTouchBlack: true
        });
    }

    getMain() {
        return $(this.getTemplate());
    }

    getTemplate() {
        let result = ['<div class="component-actionsheet"><ul>'];
        let self = this;
        let options = self.options;
        if (options.tip) {
            result.push('<li class="component-actionsheet-tip">'
                + options.tip
                + '</li>'
            );
        }
        options.actions.forEach(
            (item) => {
                result.push(self.getItemTemplate(item));
            }
        );
        result.push('</ul>');
        return result.join('')
            + '<div class="component-actionsheet-cancel">'
            +   '<button type="button" data-opttype="cancel">取消</button>'
            + '</div>';
    }

    getItemTemplate(item) {
        return `
            <li><button data-opttype="${item.opttype}">${item.text}</button></li>
        `;
    }

    show() {
        this.panel.show();
    }

    hide() {
        this.panel.hide();
    }

    dispose() {
        this.panel.dispose();
        this.main.off('click').remove();
    }

}

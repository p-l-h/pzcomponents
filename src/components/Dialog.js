
import { Panel } from './Panel';

export class Dialog {
    constructor(options) {
        this.options = options;
        this.init();
    }

    init() {
        let self = this;
        let options = self.options;

        self.panel = new Panel({
            inner: self.getMain(),
            closeOnTouchBlack: true
        });

        options.bindEvents && options.bindEvents.apply(self);

    }

    getMain() {
        this.main = $(this.getTemplate());
        return this.main;
    }

    getTemplate() {

        let self = this;
        let options = self.options;

        let titleHtml = `
            <div class="${self.getClass('title')}">${options.title || ''}</div>
        `;

        let bodyHtml = `
                <div class="${self.getClass('body')}">${options.body || ''}</div>
            `;

        let footerHtml = `
            <div class="${self.getClass('footer')}">${options.footer || ''}</div>
        `;


        return `
            <div class="${self.getClass()} ${options.skin}">
                ${titleHtml}${bodyHtml}${footerHtml}
            </div>
        `;
    }

    setBody(content) {
        this.main.find('.' + this.getClass('body')).html(content);
    }

    setTitle(title) {
        this.main.find('.' + this.getClass('title')).html(title);
    }

    show() {
        this.panel.show();
    }

    hide() {
        this.panel.hide();
    }

    getClass(suffix) {
        return 'component-dialog' + (suffix ? ('-' + suffix) : '');
    }

}


export class Popup extends Dialog {
    constructor(options) {
        super(options);
        this.handlers = {};
        this.bindEvents();
    }

    bindEvents() {
        let self = this;
        $(self.main).find('.' + self.getClass('footer'))
            .on('click', 'button', function (e) {

                let opttype = $(this).data('opttype');

                if (opttype) {
                    self.callHandler(opttype);
                }

            });
    }

    addHandler(opttype, handler, autoRemove=true) {
        let self = this;
        let handlers = self.handlers;

        handlers[opttype] = handlers[opttype] || [];
        handler.autoRemove = autoRemove;
        handlers[opttype].push(handler);
        return self;
    }

    removeHandler(opttype, handler) {
        let handlers = this.handlers;

        if (handler) {
            handlers[opttype].forEach(
                (item, index) => {
                    if (item === handler) {
                        handlers[opttype][index] = null;
                    }
                }
            );
        }
        else {
            handlers[opttype] = [];
        }
    }

    callHandler(opttype) {
        let self = this;
        let handlers = self.handlers;

        handlers[opttype].forEach(
            (item) => {
                if (item) {
                    item.apply(self);

                    if (item.autoRemove) {
                        self.removeHandler(opttype, item);
                    }
                }
            }
        );

    }

}


const alertDialog = new Popup({
    footer: `
        <button type="button" data-opttype="ok">好</button>
    `,
    skin: 'alert'
});

alertDialog.addHandler('ok', function () {
    this.hide();
}, false);

export const alert = (content, title='') => {
    alertDialog.setBody(content);
    alertDialog.setTitle(title);
    alertDialog.show();

    return alertDialog;
};


const confirmDialog = new Popup({
    footer: `
        <button type="button" class="btn-default btn" data-opttype="no">否</button>
        <button type="button" class="btn-primary btn" data-opttype="yes">是</button>
    `,
    skin: 'confirm'
});

confirmDialog.addHandler('no', function () {
    this.hide();
}, false);

export const confirm = (content, title='') => {
    confirmDialog.setBody(content);
    confirmDialog.setTitle(title);
    confirmDialog.show();

    return confirmDialog;
};

const promptDialog = new Popup({
    footer: `
        <button type="button" class="btn-default btn" data-opttype="no">取消</button>
        <button type="button" class="btn-primary btn" data-opttype="yes">确定</button>
    `,
    skin: 'prompt'
});
promptDialog.addHandler('no', function () {
    this.hide();
}, false);

export const prompt = (placeholder, title='') => {
    promptDialog.setBody('<textarea rows="4" placeholder="' + placeholder + '"></textarea>');
    promptDialog.setTitle(title);
    promptDialog.show();

    return promptDialog;
};

export const promptInput = (value, title='') => {
    promptDialog.setBody('<input type="text" value="' + value + '"/>');
    promptDialog.setTitle(title);
    promptDialog.show();

    return promptDialog;
};

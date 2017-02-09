


export class Panel  {
    constructor(options) {
        this.options = options;
        this.init();
    }

    init() {

        let self = this;
        let options = self.options;

        self.container = $(self.getTemplate());

        if (typeof options.inner !== 'string') {
            self.inner = options.inner;
        }
        else {
            self.inner = options.inner;
        }

        self.container.append(self.inner);

        if (options.bindEvents) {
            options.bindEvents(self.container);
        }

        $(document.body).append(self.container);
        self.bindEvents();

    }

    getTemplate() {
        return `
            <div class="component-panel" style="display:none;">
                <div class="mask"></div>
            </div>
        `;
    }

    bindEvents() {

        let self = this;
        let inner = self.inner;
        let options = self.options;

        if (options.closeOnTouchBlack) {
            self.container.on('click', function (e) {
                if (!$.contains(inner[0], e.target)) {
                    self.hide();
                }
            });
        }

    }

    show() {
        $(document.body).addClass('overflow-hidden');
        this.container.show();
    }

    hide() {
        $(document.body).removeClass('overflow-hidden');
        this.container.hide();
    }

    dispose() {
        this.hide();
        this.container.off('click').remove();
    }
}

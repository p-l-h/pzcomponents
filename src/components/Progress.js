

export class Progress {
    constructor(container, options) {
        this.container = container;
        this.options = options;
        this.init();
    }

    init() {

        let self = this;

        if (self.options.skin) {
            self.container.addClass('skin-' + self.options.skin);
        }
        self.bar = $(self.getTemplate());
        self.setValue(self.options.value);

        self.bar.appendTo(self.container);
        self.initEvents();

    }

    getTemplate() {
        return `
            <div class="component-progress-value">
                <i></i>
            </div>
        `;
    }

    initEvents() {
        let self = this;

        let startPosition = {
            x: 0,
            y: 0
        }
        let endPosition = {
            x: 0,
            y: 0
        };

        let startValue = 0;

        
        self.bar.children('i')
            .on('touchstart', function (e) {
                e.preventDefault();
                e.stopPropagation();
                startValue = self.options.value;

                let touch = e.changedTouches[0];

                startPosition.x = touch.pageX;
                startPosition.y = touch.pageY;
                
            });

        self.container.on('touchmove', function (e) {
            e.preventDefault();
            e.stopPropagation();
            let touch = e.changedTouches[0];
            let barWidth = self.container.width();

            endPosition.x = touch.pageX;
            endPosition.y = touch.pageY;

            let moved = endPosition.x - startPosition.x;
            moved = (moved / barWidth) * 100;
            
            self.setValueByDrag(+startValue + moved);

        });
    }

    setValue(val) {

        if (!val) {
            val = 0;
        }

        this.options.value = val;
        this.bar.css('width', val + '%');
    }


    setValueByDrag(val) {
        
        let self = this;

        if (self.dragCallback) {
            self.dragCallback.call(self,val);
        }
        else {
            self.setValue(val.toFixed(2));
        }
    }

    setDragCallback(callback) {
        this.dragCallback = callback;
    }

    getValue() {
        return this.options.value;
    }


}
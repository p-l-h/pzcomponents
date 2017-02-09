
import { EventBase } from './EventBase';


export class BoxGroup extends EventBase {
    constructor(container, options) {
        super(container);
        this.options = options;
        this.init();
    }
    init() {
        this.container.html(
            this.getTemplate()
        );
        this.boxes = this.container.find('input[type="checkbox"]');
        this.initEvents();
    }
    initEvents() {

        let group = this;
        let options = group.options;
        let container = group.container;
        let klass = options.klass || {};

        container.on('click', 'input[type="checkbox"]', function() {
            let target = this;
            let $target = $(target);
            let $parent = $target.parent();

            if (options.mode === 'single') {

                if (!target.checked) {
                    return;
                }
                group.boxes.each(
                    (index, item) =>{
                        if (item !== target ) {
                            item.checked = false;
                            if (klass.active) {
                                $(item).parent().removeClass(klass.active)
                                    .addClass(klass.normal);
                            }

                        }
                    }
                );
            }


            if (klass.active) {
                if (target.checked) {
                    $parent.addClass(klass.active).removeClass(klass.normal);
                }
                else {
                    $parent.removeClass(klass.active).addClass(klass.normal);
                }
            }

            group.trigger('changed');
        });
    }
    getTemplate() {
        let result = [];
        let options = this.options;
        let klass = options.klass || {};
        let dataSource = options.dataSource;
        dataSource.forEach(
            (item, index) => {
                if (typeof item !== 'object') {

                    dataSource[index] = {
                        value: index,
                        label: item
                    };
                    item = dataSource[index];
                }


                result.push(`
                    <label class="${klass.normal}">
                        <input name="${options.name}" type="checkbox" value="${item.value}"/>
                        ${item.label}
                    </label>
                `);

            }
        );

        return result.join('');
    }

    getValue() {
        let result = [];
        let dataSource = this.options.dataSource;
        this.boxes.each(
            (index, item) => {
                if (item.checked) {
                    result.push(dataSource[index]);
                }
            }
        );

        return result;
    }

    changeMode(mode) {
        let options = this.options;
        if (mode === options.mode) {
            return;
        }
        else if (mode === 'single') {
            this.boxes.each(
                (index, item) => {
                    item.checked = false;
                    $(item).parent().removeClass(options.klass.active);
                }
            );
            this.trigger('changed');
        }

        this.options.mode = mode;


    }
}

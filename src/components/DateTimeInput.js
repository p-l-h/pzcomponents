
import {EventBase} from './EventBase';

export class DateTimePicker extends EventBase {
    constructor(container, options) {
        super(container);
        this.options = options;
        this.init();
    }

    init() {
        this.container.html(
            this.getTemplate()
        );
        this.input = this.container.find('input[type="datetime-local"]');
        this.shower = this.input.prev();
        this.bindEvents();

    }

    getTemplate() {
        let options = this.options;
        let datepickerInput = `
            <input type="datetime-local" name="${options.name}" />
        `;

        if ($.os.phone) {
            this.useFaker = true;
            return `
                <div class="component-datetimepicker-faker">
                    <em>${options.placeholder}</em>
                    ${datepickerInput}
                </div>
            `;
        }
        else {
            return datepickerInput;
        }
    }

    bindEvents() {
        let inputer = this;

        inputer.input
            .on('input', function(e) {


                if (inputer.useFaker) {

                    inputer.shower.html(
                        this.value
                    );
                }
            });
    }
}

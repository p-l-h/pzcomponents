

const $window = $(window);

export class DropDown {
    constructor(options) {
        this.options = options;
        this.init();
    }

    init() {
        let self = this;
        self.main = self.getMain();

        let events = self.options.events;

        self.main.on('click', 'button', function () {
            let opttype = $(this).data('opttype');

            let currentEventHandler = events[opttype];

            currentEventHandler && currentEventHandler.call(this);

        });

        self.main.appendTo($(document.body));

        $(document.body).on('click', (e) => {
            if (!$.contains(self.main[0], e.target)) {
                self.hide();
            }
        });
    }

    getMain() {
        return $(this.getTemplate());
    }

    getTemplate() {
        let result = ['<div class="component-dropdown"><ul>'];
        let self = this;
        self.options.actions.forEach(
            (item) => {
                result.push(self.getItemTemplate(item));
            }
        );
       
        result.push('</ul>');

        return result.join('');
    }

    getItemTemplate(item) {
        return `
            <li><button data-opttype="${item.opttype}">${item.text}</button></li>
        `;
    }

    attachTo(elem) {

        let self = this;
        let options = self.options;

        options.position = options.position || 'left';
        
        // let scrollTop = $window.scrollTop();
        // let scrollLeft = $window.scrollLeft();
        let windowWidth = $window.width();
        let bodyHeight = $(document.body).height();
        let offset = elem.offset();

        let position = {};

        switch(options.position) {
        case 'left':
            position.right = windowWidth - offset.left;
            position.top = offset.top + offset.height /2;
            break;
        case 'top':
            position.bottom = bodyHeight - offset.top;
            position.left = offset.left;
            break;
        case 'right':
            position.top = offset.top;
            position.right = offset.left + offset.width;
            break;
        case 'bottom':
            position.top = offset.top + offset.height;
            position.left = offset.left;
            break;
        default:
            break;
        }
        self.main.addClass('component-dropdown-' + options.position);
        self.setPosition(position);
    }
    
    setPosition(pos) {
        let self = this;
        self.coordinate = pos;

        let css = {};
        for (let key in pos) {
            css[key] = pos[key] + 'px';
        }

        self.main.css(css);   
    }

    getPosition() {
        return this.coordinate;
    }
   
    show() {
        this.main.show();
    }

    hide() {
        this.main.hide();
    }
}
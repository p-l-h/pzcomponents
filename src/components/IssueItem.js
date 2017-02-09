

import EventBase from './EventBase';
import Audio from './Audio';
import weixinApi from '../common/functions/weixinApi';



export class IssueItem extends EventBase {
    constructor(container, options) {
        super(container);
        this.options = options;
        this.init();
    }

    init() {
        this.initComponent();
        this.initEvents();
    }

    initComponent() {
        this.initAudios();
        this.initImages();
    }

    initAudios() {
        this.container.find('.component-audio')
            .each(
                (index, item) => {
                    new Audio($(item));
                }
            );
    }

    initImages() {
        let result = [];
        this.imgList = this.container.children('.issue-detail-imgs');
        this.imgList.find('img')
            .each(
                (item) => {
                    result.push(item.src);
                }
            );

        this.imgSources = result;
    }
    
    initEvents() {
        let that = this;
        that.imageList.on('click', 'img', (e) => {
            weixinApi.previewImage(item.src, that.imgSources);
        });
    }
}
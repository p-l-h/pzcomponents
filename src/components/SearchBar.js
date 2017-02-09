

import {EventBase} from './EventBase';
import {postJson} from '../common/functions/request';

export class SearchBar extends EventBase {

    /**
     * Creates an instance of SearchBar.
     *
     * @param {ZeptoElem} container 容器
     * @param {Object} options 配置项
     * @property {string} options.method GET OR POST
     * @property {string} options.action 要请求的url
     * @property {Function} options.getParams 获取查询参数
     * @property {Function} options.searched 搜索结束之后
     */
    constructor(container, options) {
        super(container);

        this.options = options;
        this.init();
    }
    init() {
        this.container.html(
            this.getTemplate()
        );

        this.searchInput = this.container.find('input[type="search"]');
        this.searchForm = this.container.find('form');


        this.initEvents();
    }

    getTemplate() {

        let options = this.options;
        return `
            <form class="component-searchbar-form" action="${options.action}" method="${options.method}">
                <div class="component-searchbar-input">
                    <input type="search" name="${options.field}" placeholder="${options.placeholder||''}"/>
                </div>
                <button type="submit" class="ion-ios-search"></button>
            </form>
        `;
    }


    initEvents() {

        let self = this;
        let options = self.options;

        self.searchForm
            .on('submit', function (e) {

                e.preventDefault();

                let postData = {};
                postData[options.field] = self.searchInput.val().trim();

                if (options.getParams) {
                    postData = options.getParams(postData);
                }


                postJson(
                    options.action,
                    postData,
                    (data) => {
                        options.searched.call(self, data);
                    }
                );

            })
            .on('click', function (e) {
                self.focus();
            });

        $(document).on('click', function (e) {
            let form = self.searchForm[0];

            if (!$.contains(form, e.target)) {
                self.blur();
            }
        });
    }

    /**
     * 激活searchbar
     *
     * @param {Boolean} selfTrigger 是否是由输入框触发的
     */
    focus(selfTrigger) {
        this.active = true;
        this.container.addClass('active');
        !selfTrigger && this.searchInput.focus();
    }

    /**
     * 移除searchbar 的激活状态
     *
     * @param {Boolean} selfTrigger 是否是由输入框触发的
     */
    blur(selfTrigger) {
        this.active = false;
        this.container.removeClass('active');
        !selfTrigger && this.searchInput.blur();

    }
}


import {EventBase} from './EventBase';

import {getJson} from '../common/functions/request';
import {listenToScroll} from '../common/functions/listenToScroll';

export class ListBase extends EventBase {

    /**
     * options = {
     *     template: '', // hogan compiled template
     *     url: '',
     *     processData: () = {},
     *     defaultParams: {},
     *     selfScroller: true,
     *     loadMoreByHand: false,
     *     autoLoad: true,
     *     loadMoreTemplate: '<li>查看更多</li>'
     * }
     */
    constructor(container, options) {
        super(container);
        this.options = options;
        this.listData = [];
        this.init();
    }

    init() {
        this.fetchData(this.options.defaultParams, this.options.clearAtInitial);
        this.initEvents();
    }

    fetchData(params, clear) {
        let list = this;
        let options = list.options;

        let requestParams =  {};
        $.extend(requestParams, options.defaultParams);
        $.extend(requestParams, params);


        if (clear) {
            list.clear();
        }

        getJson(options.url, requestParams, (data) => {

            data = data || {};

            if(options.processData) {
                options.processData(data);
            }


            let appendedItems = $(options.template.render(data));
            list.container.append(
                appendedItems
            );

            list.trigger('appended', data, appendedItems);

            // let pageData = data.page || {
            //     pageNum: 1,
            //     pageSize: 10,
            //     count: 0
            // };

            // if (+pageData.pageSize * +pageData.pageNum >= pageData.count) {
            //     list.nomore(true);
            // }
            // else {
            //     list.nomore(false);
            // }

        });
    }

    addListData(list) {

        let listData = this.listData;

        if (!list) {
            return;
        }

        list.forEach(
            (item) => {
                listData.push(item);
            }
        );
    }

    initEvents() {

        let list = this;
        let options = list.options;

        let $window = $(window);
        let $body = $(document.body);


        // 如果使用自动加载的话，那么久默认绑定滚到底部的事件
        if (options.autoLoad) {
            list.on('scrollToBottom', function () {

                if (list.container.css('display') === 'none') {
                    return;
                }
                list.fetchData({
                    pageNum: ++options.defaultParams.pageNum
                });
            });
            list.on('loadMore', function () {
                list.fetchData({
                    pageNum: ++options.defaultParams.pageNum
                });
            });
        }

        // 手动加载的话，绑定点击事件
        if (list.options.loadMoreByHand) {
            let loadMoreElem = $(list.options.loadMoreTemplate || '<li class="more">查看更多</li>');

            loadMoreElem.on('click', function () {
                list.trigger('loadMore');
            });
            list.loadMoreElem = loadMoreElem;
        }
        else {
            // 滚动加载的话，绑定滚动事件
            listenToScroll(
                $window,
                (evt) => {

                    if (evt.direction === 'up') {
                        return;
                    }

                    if (list.nomoreData) {
                        return;
                    }

                    let screenHeight = $window.height();
                    let bodyHeight = $body.height();
                    let scrollTop = $body.scrollTop();

                    if (bodyHeight - scrollTop - 10 < screenHeight) {
                        list.trigger('scrollToBottom');
                    }
                }
            );
        }

    }


    nomore(nomore) {
        let list = this;

        list.nomoreData = !!nomore;

        if (nomore && list.options.loadMoreByHand) {
            list.loadMoreElem.remove();
        }
        else if (!nomore && list.options.loadMoreByHand) {
            list.loadMoreElem.appendTo(list.container);
        }


    }

    getListData() {
        return this.listData;
    }

    reload() {
        this.fetchData(null, true);
    }

    setOptions(options) {

        $.extend(this.options, options);
        this.fetchData(this.options.defaultParams, true);
    }

    clear() {
        this.listData = [];
        this.container.html('');
    }
}

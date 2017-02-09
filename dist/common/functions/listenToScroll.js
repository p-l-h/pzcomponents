'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.listenToScroll = listenToScroll;

/**
 * 监听滚轮事件
 * @author peilonghui
 */

function listenToScroll(elem, callback) {

    var to = void 0;
    var lastScrollHeight = 0;

    elem.on('scroll', function (e) {

        to && clearTimeout(to);

        to = setTimeout(function () {

            var currentScrollHeight = elem.scrollTop();
            var direction = 'down';
            if (lastScrollHeight > currentScrollHeight) {
                direction = 'up';
            }

            lastScrollHeight = currentScrollHeight;

            callback({
                direction: direction
            });
        }, 500);
    });
}
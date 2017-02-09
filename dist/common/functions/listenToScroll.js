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
    var lastScrollTop = elem.scrollTop();

    elem.on('scroll', function (e) {
        to && clearTimeout(to);

        to = setTimeout(function () {

            var currentScrollTop = elem.scrollTop();
            var direction = 'down';
            if (lastScrollTop > currentScrollTop) {
                direction = 'up';
            }
            lastScrollTop = currentScrollTop;
            callback({
                direction: direction,
                event: e
            });
        }, 500);
    });
}
//# sourceMappingURL=listenToScroll.js.map
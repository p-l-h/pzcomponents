'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.listenToScroll = listenToScroll;
exports.unListenToScroll = unListenToScroll;
function listenToScroll(elem, callback) {
    var lastScrollTop = elem.scrollTop || elem.scrollY;
    var handler = function handler(e) {
        handler.timer && clearTimeout(handler.timer);
        handler.timer = setTimeout(function () {
            var currentScrollTop = elem.scrollTop || elem.scrollY;
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
    };
    handler.callback = callback;
    elem.__scrollHandlers = elem.__scrollHandlers || [];
    elem.__scrollHandlers.push(handler);
    if (elem === document || elem === document.body || elem === document.documentElement) {
        elem = window;
    }
    elem.addEventListener('scroll', handler);
};

function unListenToScroll(elem, callback) {
    elem.__scrollHandlers = elem.__scrollHandlers || [];
    var newHandlers = [];
    var oldElem = elem;

    elem.__scrollHandlers.forEach(function (item) {
        if (item.callback === callback) {
            clearTimeout(item.timer);
            elem = elem === document.body ? document : elem;
            elem.removeEventListener('scroll', item);
        } else {
            newHandlers.push(item);
        }
    });
    oldElem.__scrollHandlers = newHandlers;
};
//# sourceMappingURL=listenToScroll.js.map
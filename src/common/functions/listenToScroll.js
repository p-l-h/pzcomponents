
/**
 * 监听滚轮事件
 * @author peilonghui
 */

export function listenToScroll(elem, callback) {
    let lastScrollTop = elem.scrollTop || elem.scrollY;
    const handler =  (e) =>{
        handler.timer && clearTimeout(handler.timer);
        handler.timer = setTimeout(
            () => {
                let currentScrollTop = elem.scrollTop || elem.scrollY;
                let direction = 'down';
                if (lastScrollTop > currentScrollTop) {
                    direction = 'up';
                }
                lastScrollTop = currentScrollTop;
                callback({
                    direction: direction,
                    event: e
                });
            },
            500
        );
    };
    handler.callback = callback;
    elem.__scrollHandlers = elem.__scrollHandlers || [];
    elem.__scrollHandlers.push(handler);
    if (elem === document || elem === document.body || elem === document.documentElement) {
        elem = window;
    }
    elem.addEventListener('scroll', handler);
};

export function unListenToScroll (elem, callback) {
    elem.__scrollHandlers = elem.__scrollHandlers || [];
    const newHandlers = [];
    const oldElem = elem;
    
    elem.__scrollHandlers.forEach(
        (item) => {
            if (item.callback === callback) {
                clearTimeout(item.timer);
                elem = (elem === document.body) ? document : elem;
                elem.removeEventListener('scroll', item);
            } else {
                newHandlers.push(item);
            }
        }
    );
    oldElem.__scrollHandlers = newHandlers;
};


    
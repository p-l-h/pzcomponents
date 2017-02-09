
/**
 * 监听滚轮事件
 * @author peilonghui
 */


export function listenToScroll(elem, callback) {

    let to;
    let lastScrollTop = elem.scrollTop();

    elem.on('scroll', (e) =>{
        to && clearTimeout(to);

        to = setTimeout(
            () => {

                let currentScrollTop = elem.scrollTop();
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
    });
}

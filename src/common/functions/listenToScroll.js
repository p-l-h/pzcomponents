
/**
 * 监听滚轮事件
 * @author peilonghui
 */


export function listenToScroll(elem, callback) {
    
    let to;
    let lastScrollHeight = 0;
    
    elem.on('scroll', (e) =>{
        
        to && clearTimeout(to);
        
        to = setTimeout(
            () => {
                
                let currentScrollHeight = elem.scrollTop();
                let direction = 'down';
                if (lastScrollHeight > currentScrollHeight) {
                    direction = 'up';
                }
                
                lastScrollHeight = currentScrollHeight;
                
                callback({
                    direction: direction
                });
            },
            500
        );
    });
}
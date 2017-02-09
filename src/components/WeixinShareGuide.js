

const WEIXIN_SHARE_GUIDE = `
    <div class="component-weixinshare-guide">
        <img src="http://img.gsxservice.com/14554196_kggv8sac.png" />
        <div class="component-weixinshare-guide-text"></div>
    </div>
`;

const $weixinShareGuide = $(WEIXIN_SHARE_GUIDE);


export class WeixinShareGuide  {
    constructor() {
        this.init();
    }

    init() {
        let self = this;
        $(document.body).append($weixinShareGuide);

        $weixinShareGuide.on('click', () => {
            self.hide();
        });
    }

    setContent(html) {
        $weixinShareGuide.find('.component-weixinshare-guide-text')
            .html(`<div>${html}</div>`);
    }

    show() {
        $weixinShareGuide.show();
    }

    hide() {
        $weixinShareGuide.hide();
    }
}

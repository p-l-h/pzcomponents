

const WEIXIN_SHARE_GUIDE = `
    <div class="share-guide">
        <img src="http://img.gsxservice.com/14554196_kggv8sac.png" />
        <div class="share-guide-text">
            <p>请点击右上角将作业分享给好友或朋友圈</p>
        </div>
    </div>
`;

const $weixinShareGuide = $(WEIXIN_SHARE_GUIDE);


export class weixinShareGuide  {
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

    show() {
        $weixinShareGuide.show();
    }

    hide() {
        $weixinShareGuide.hide();
    }
}

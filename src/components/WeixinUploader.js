
import {postJson} from '../common/functions/request';
import {weixinApi} from '../common/functions/weixinApi';

export  class Uploader {
    constructor (trigger, options) {
        this.trigger = trigger;
        this.options = options;
        this.init();
    }

    init() {
        let self = this;
        let options = self.options;


        self.trigger.on('click', () => {
            weixinApi.chooseImage(1, (localIds) => {
                let img = new Image;

                img.onload = () => {
                    weixinApi.uploadImage(localIds[0], (serverId) => {
                        options.success && options.success({
                            serverId: serverId,
                            width: img.width,
                            height: img.height
                        });

                    });
                };

                img.src = localIds[0];

            });
        });
    }

}

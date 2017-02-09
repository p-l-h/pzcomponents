


import {weixinApi} from '../common/functions/weixinApi';

export class Audio {
    constructor(container) {

        this.container = container;
        this.url = container.data('url');
        this.localId = container.data('localid');
        this.seconds = container.data('seconds');
        this.init();
    }
    init() {

        let container = this.container;

        if (+container.data('inited')) {
            return;
        }

        container.html(
            this.getTemplate() + container.html()
        );

        let thisWidth = 0.15 + Math.sqrt(this.seconds/60) * 0.85;
        thisWidth *= 100;
        container.css('width', thisWidth + '%');
        this.bindEvents();

        container.data('inited', 1);
    }
    getTemplate() {
        if (!this.localId) {
            return  `
                <i></i>
                <em>${this.seconds}''</em>
                <div class="component-audio-progress"></div>
                <audio preload="none" controls src="${this.url}"></audio>
            `;
        }
        else {
            return  `
                <i></i>
                <em>${this.seconds}''</em>
                <div class="component-audio-progress"></div>
            `;
        }

    }
    bindEvents() {
        let that = this;

        weixinApi.onVoicePlayEnd(function (localId) {
            if (localId === that.localId) {
                that.weixinToggle();
            }
        });
        this.container.on('click', () => {

            if (that.localId) {
                that.weixinToggle();
            }
            else {
                that.toggle();
            }
        });
    }

    weixinToggle() {
        let that = this;
        let container = this.container;
        let gif = container.children('i');

        if (that.playing) {
            weixinApi.stopVoice(that.localId);
            gif.removeClass('playing');
        }
        else {
            weixinApi.playVoice(that.localId);
            gif.addClass('playing');
        }


        that.playing = !that.playing;

    }

    toggle() {
        let $this = this.container;
        let $audio = $this.children('audio');
        let audio = $audio[0];
        let gif = $this.children('i');
        let progress = $this.children('.component-audio-progress');

        if (!$audio.data('binded')) {
            audio.addEventListener('pause', function () {
                gif.removeClass('playing');
            });

            audio.addEventListener('timeupdate', function () {

                let percent = audio.currentTime / audio.duration  * 100 ;

                if (percent > 100) {
                    percent = 100;
                }
                progress.css(
                    'width',
                    percent + '%'
                );
            });


            $audio.data('binded', 1);
        }

        if (audio.paused) {
            audio.play();
        }
        else {
            audio.pause();
        }

        gif.addClass('playing');
    }


    distroy() {

    }
}

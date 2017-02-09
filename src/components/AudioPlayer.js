


import { TimeProgress } from './TimeProgress';

export class AudioPlayer {
    constructor(container, options) {
        this.container = container;
        this.options = options || {};


        this.init();
    }

    init() {
        let self = this;
        let options = self.options;
        let container = self.container;

        options.timeProgress = options.timeProgress || {};

        if (options.skin) {
            self.container.addClass('skin-' + options.skin);
            options.timeProgress.skin = options.skin;
        }

        if (!options.url) {
            options.url = container.data('url');
        }

        if (!options.timeProgress.total) {
            options.timeProgress.total = container.data('seconds');
            options.timeProgress.value = options.timeProgress.value || 0;
        }

        container.html(self.getTemplate() + container.html());
        self.audio = self.container.children('audio')[0];
        self.timeProgress = new TimeProgress(
            self.container.find('.component-timeprogress'),
            self.options.timeProgress
        );

        self.timeProgress.setValueUpdatedByHand(
            function (currentTime) {
                self.audio.currentTime = currentTime;
            }
        );


        self.initEvents();
        container.css('display', 'block');

    }


    initEvents() {
        let self = this;
        let audio = self.audio;
        self.container.find('.' + self.getClass('toggle'))
            .on('click', function () {

                if (self.playing) {
                    audio.pause();
                }
                else {
                    audio.play();
                    self.container.addClass('active');
                }

                self.playing = !self.playing;
            });

        audio.addEventListener('durationchange' , function () {
            self.timeProgress.setTotal(audio.duration);
        });


        audio.addEventListener('pause', function () {

            self.container.removeClass('active');
            self.playing = false;
        });

        audio.addEventListener('timeupdate', function () {

            let currentTime = audio.currentTime;
            self.timeProgress.setValue(currentTime);

        });

    }

    getTemplate() {
        let self = this;
        return `
            <div class="${self.getClass('toggle')}">
                <i class="ion-play"></i>
                <i class="ion-pause"></i>
            </div>
            <div class="component-timeprogress">
            </div>
            <div class="${self.getClass('volume')}">
            </div>
            <audio preload="metadata"  controls>
                <source src="${self.options.url}" type="audio/mpeg" codecs="mp3"></source>
            </audio>
        `;
    }

    getClass(suffix) {
        return 'component-audioplayer' + (suffix ? ('-' + suffix) : '');
    }

}

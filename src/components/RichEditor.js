

import { EventBase } from './EventBase';
import { weixinApi } from '../common/functions/weixinApi';
import { Audio } from './Audio';
import { AudioPlayer } from './AudioPlayer';
import { Recorder } from './Recorder';

import {loading, unloading} from './Toast';


const DELETE_IMG_CLASS = 'ion-android-remove-circle';
const noop = () => {};

class Materials extends EventBase {
    constructor(elem, options) {
        super(elem);
        this.options = options;
    }

    init() {
        let self = this;
        let options = this.options;

        if (options.readonly) {
            this.container.addClass('readonly');
        }

        if (options.data) {
            options.data.forEach(
                (item) => {
                    self.addItem(item);
                }
            );
        }

        self.bindEvents && self.bindEvents();

        this.container.on('click', '.' + DELETE_IMG_CLASS, function (e) {
            e.stopPropagation();
            $(this).closest('li').remove();
            self.count--;
        });
    }

    readonly(readonly=false) {

        if (readonly ) {
            this.container.addClass('readonly');
        }
        else {
            this.container.removeClass('readonly');
        }
        this.options.readonly = readonly;
    }

    getData(callback=noop) {
        this.getServerAndLocalIds();
        this.upload(callback);
    }

}


class Images extends Materials {
    constructor(elem, options) {
        super(elem, options);
        this.materialType = 'image';
        this.count = 0;
        this.init();
    }

    bindEvents() {

        let self = this;

        this.container.on('click', 'img', function (e) {

            e.stopPropagation();

            let $this = $(this);
            let currentUrl = $this.prop('src');

            let imgsArr = self.getAllImages();

            if (+$this.data('islocal')) {
                currentUrl = $this.data('localid');
            }
            weixinApi.previewImage(currentUrl, imgsArr);
        });


    }

    getAllImages() {
        let self = this;

        self.getServerAndLocalIds();

        let imgsArr = self.localIds.concat(self.serverIds);
        let result = [];
        imgsArr.forEach(
            (item) => {
                result.push(item.localId || item.serverId || item.url);
            }
        );
        return result;
    }


    addItem(item, isLocal=0) {

        let url = item.url;
        let height = this.container.width() * 0.24;

        this.container.append(`
            <li>
                <div class="item" style="background-image:url(${url});height:${height}">
                    <img src="${url}" data-localid="${url}" data-islocal="${isLocal}" data-sid="${item.id}"/>
                    <i class="${DELETE_IMG_CLASS}"></i>
                </div>
            </li>
        `);
        this.count++;
    }

    getServerAndLocalIds() {
        let localIds = [];
        let serverIds = [];
        this.container.find('img')
            .each(
                (index, item) => {

                    let sid = $(item).data('sid');
                    let localId = $(item).data('localid');

                    let temp = {
                        width: item.naturalWidth,
                        height: item.naturalHeight
                    };


                    if (sid !== 'undefined') {
                        temp.id = sid;
                        temp.url = localId;
                        serverIds.push(temp);
                    }
                    else {
                        temp.localId = localId;
                        localIds.push(temp);
                    }
                }
            );

        this.localIds = localIds.reverse();
        this.serverIds = serverIds;
    }


    upload(callback=noop) {

        let self = this;
        let localIds = this.localIds;
        let serverIds = this.serverIds;

        if(!localIds || !localIds.length) {
            callback(serverIds);
            return;
        }

        let item = localIds.pop();

        weixinApi.uploadImage(item.localId, (serverId) => {

            serverIds.push({
                serverId: serverId,
                width: item.width,
                height: item.height
            });

            self.upload(callback);
        });
    }

}


class Audios extends Materials {
    constructor(elem, options) {
        super(elem, options);
        this.materialType  = 'audio';
        this.count = 0;
        this.init();
    }

    addItem(item, isLocal=0) {

        let url = item.url;
        let seconds = item.seconds;

        let urlAttribute = '';
        let compType = '';
        if (isLocal) {
            urlAttribute = 'data-localid="' + url + '" ';
            compType = 'audio';
        }
        else {
            urlAttribute = 'data-url="' + url + '"';
            compType = 'audioplayer';
        }

        let tempElem = $(`
            <li>
                <div class="component-${compType}" ${urlAttribute} data-seconds="${seconds}" data-sid="${item.id}">
                    <del class="${DELETE_IMG_CLASS}"></del>
                </div>
            </li>
        `);

        if (compType === 'audio') {
            new Audio(tempElem.children('.component-audio'));
        }
        else {
            new AudioPlayer(tempElem.children('.component-audioplayer'), {
                skin: 'weixin',
                teimProgress: {

                }
            });

        }
        this.container.append(tempElem);
        this.count++;
    }

    upload(callback=noop) {

        let self = this;
        let localIds = this.localIds;
        let serverIds = this.serverIds;

        if(!localIds || !localIds.length) {
            callback(serverIds);
            return;
        }

        let item = localIds.pop();

        weixinApi.uploadVoice(item.localId, (serverId) => {

            serverIds.push({
                serverId: serverId,
                seconds: item.seconds
            });

            self.upload(callback);
        });

    }

    getServerAndLocalIds() {
        let localIds = [];
        let serverIds = [];
        this.container.find('.component-audio,.component-audioplayer')
            .each(
                (index, item) => {

                    let $item = $(item);
                    let sid = $item.data('sid');

                    let temp = {
                        seconds: $item.data('seconds')
                    };

                    if (sid !== 'undefined') {
                        temp.id = sid;
                        temp.url = $item.data('url');
                        serverIds.push(temp);
                    }
                    else {
                        temp.localId = $item.data('localid');
                        localIds.push(temp);
                    }
                }
            );

        this.serverIds = serverIds;
        this.localIds = localIds.reverse();

    }


}

const DEFAULT_EDITOR_OPTIONS = {
    imgs: {
        limit: 20
    },
    voices: {
        limit: 10
    },
    text: {
        limit: 1000
    },
    data: {
        content: ''
    }
};

export default class RichEditor extends EventBase {

    /**
     * options = {
     *     imgs: {
     *          limit: 8 // 图片限制
     *     },
     *     voices: {
     *          limit: 5 // 语音数量限制
     *     },
     *     text: {
     *          limit: 1000 //文本最大限制
     *          rows: 5 // 行数
     *          placeholder: '占位文本'
     *          content: ‘初始值'
     *     },
     *     data: {
     *     }
     * }
     */
    constructor(elem, options={}) {
        super(elem);

        let tempOptions = {};
        $.extend(true, tempOptions, DEFAULT_EDITOR_OPTIONS);
        $.extend(true, tempOptions, options);

        this.options = tempOptions;
        this.init();
    }


    init() {

        let self = this;
        let container = self.container;
        let options = self.options;

        if (options.readonly) {
            container.addClass('readonly');
        }
        container.html(
            self.getTemplate()
        );

        self.imgButton = container.find('.icon-camera');
        self.voiceButton = container.find('.icon-mic');
        self.textBox = container.children('.component-richeditor-text');
        self.textFaker = container.children('.component-richeditor-faker');



        self.imagesComponent = new Images(
            container.children('.component-richeditor-imgs'),
            $.extend(
                options.imgs,
                {
                    readonly: options.readonly,
                    data: options.data.imgs
                }
            )
        );
        self.audiosComponent = new Audios(
            container.children('.component-richeditor-audios'),
            $.extend(
                options.voices,
                {
                    readonly: options.readonly,
                    data: options.data.voices
                }
            )
        );


        self.recorder = new Recorder({
            success: (localId, seconds) => {
                self.recordPanelOpened  = false;

                if (seconds === 0) {
                    return;
                }
                self.audiosComponent.addItem({
                    url: localId,
                    seconds: seconds
                },1);
            }
        });

        if (options.readonly) {
            self.readonly(true);
        }

        self.bindEvents();

    }
    getTemplate() {
        let options = this.options;
        options.data.content  = options.data.content || '';

        let buttonsTemplate = [];

        if (options.imgs && !options.imgs.disabled) {
            buttonsTemplate.push('<button data-opttype="add-img" class="icon-camera" type="button">图</button>');
        }

        return `
            <div class="component-richeditor-text" contenteditable="${!options.readonly}">${options.data.content}</div>
            <ol class="component-richeditor-audios">
            </ol>
            <ul class="component-richeditor-imgs">
            </ul>
            <div class="component-richeditor-btns">
                ${buttonsTemplate.join('')}
                <button data-opttype="add-voice" type="button" class="icon-mic">音</button>
            </div>
        `;
    }

    bindEvents() {

        let editor = this;
        let options = this.options;

        editor.container.on('click', 'button', function(e)  {
            let $this = $(this);
            let opttype = $this.data('opttype');
            let leftedCount = 8;

            if (opttype === 'add-img') {
                leftedCount = options.imgs.limit - editor.imagesComponent.count;
                if ( leftedCount > 0 ) {
                    editor.chooseImage((leftedCount > 9) ? 9 : leftedCount );
                }
                else {
                    alert('最多上传' + options.imgs.limit + '张图片');
                }
            }
            else if (opttype === 'add-voice') {

                leftedCount = options.voices.limit - editor.audiosComponent.count;
                if ( leftedCount <= 0 ) {
                    alert('最多上传' + options.voices.limit + '条语音');
                    return;
                }

                if (editor.recordPanelOpened) {
                    editor.closeRecordPanel();
                }
                else {
                    editor.openRecordPanel();
                }
            }
        });

    }

    chooseImage(limit=8) {
        let editor = this;
        weixinApi.chooseImage(
            limit,
            (localIds) => {
                localIds.forEach(
                    (item) => {
                        editor.imagesComponent.addItem({
                            url: item
                        }, 1);
                    }
                );
            }
        );
    }

    openRecordPanel() {
        this.recordPanelOpened = true;
        this.recorder.show();
    }

    closeRecordPanel() {
        this.recordPanelOpened = false;
        this.recorder.hide();
    }

    upload() {
        let editor = this;
        loading();
        editor.imagesComponent.getData(
            (imgs) => {
                editor.audiosComponent.getData(
                    (audios) => {
                        unloading();
                        editor.uploaded && editor.uploaded(imgs, audios, editor.textBox.html());
                    }
                );
            }
        );
    }

    readonly(readonly=false) {
        let editor = this;
        let  options = editor.options;


        editor.textBox.prop('contenteditable', !readonly);
        editor.imagesComponent.readonly(readonly);
        editor.audiosComponent.readonly(readonly);

        if (readonly) {
            editor.imgButton.hide();
            editor.voiceButton.hide();
            editor.container.addClass('readonly');
        }
        else {
            editor.imgButton.show();
            editor.voiceButton.show();
            editor.container.removeClass('readonly');

        }

        options.readonly = readonly;
    }

    focus() {
        this.textBox.focus();
    }

    getHtml() {
        return this.textBox.html();
    }

    setHtml(content) {
        this.textBox.html(content);
    }

}

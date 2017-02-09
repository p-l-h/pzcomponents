/**
 * @file WebSocket封装
 * @author peilonghui
 */

import {EventObserver} from './EventObserver';

export const IF_SUPPORT = !!(window.WebSocket || window.MozWebSocket);

const WebSocket = window.WebSocket || window.MozWebSocket;

export class CustomWebSocket extends EventObserver {
    constructor(url, protocols) {
        super();

        if (protocols) {
            this.ws = new WebSocket(url, protocols);
        }
        else {
            this.ws = new WebSocket(url);
        }
        this.bindEvents();
    }

    keepAlive() {
        let cws = this;
        cws.startHeartBeat();
        cws.wsInterval = window.setInterval(function () {
            cws.startHeartBeat();
        }, 20000);
    }


    bindEvents() {
        let cws = this;
        let ws = cws.ws;
        ws.onopen = (evt) => {
            cws.fire('open', evt);
            cws.keepAlive();
        };

        ws.onclose = (evt) => {
            cws.fire('close', evt);
            window.clearInterval(cws.wsInterval);
        };

        ws.onmessage = (evt) => {
            cws.fire('message', evt);
        };

        ws.onerror = (evt) => {
            cws.fire('error', evt);
        };

    }

    startHeartBeat() {
        this.send({
            type: 'ping'
        });
    }

    send(data) {
        this.ws.send(JSON.stringify(data));
    }

    close() {
        this.ws.close();
    }
}

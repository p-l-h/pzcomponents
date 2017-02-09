

export class EventBase {
    constructor(container) {
        this.container = container;
    }

    on(eventName, handler) {
        this.container.on(eventName, handler);
    }

    trigger(eventName, evt) {
        this.container.trigger(eventName, evt);
    }

    off(eventName, handler) {
        this.container.off(eventName, handler);
    }
}

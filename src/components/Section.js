export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }

    rendererAll(data, userInfo) {
        this._initialArray = data;
        this._initialArray.forEach(item => {
            this.addItem(item, userInfo);
        });
    }

    addItem(item, userInfo) {
        const renderedCard = this._renderer(item, userInfo);
        this._container.prepend(renderedCard);
    }
}
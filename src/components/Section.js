export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._initialArray = data;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    rendererAll() {
        this._initialArray.forEach( item => {
            this.addItem(item);
        });
    }

    addItem(item) {
        const renderedCard = this._renderer(item);
        this._container.prepend(renderedCard);
    }
}
import PopupWithImage from './PopupWithImage.js';

export default class Card {
    constructor( {data, selector, handleCardClick }) {
        this._url = data.link;
        this._name = data.name;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        return document
            .querySelector(this._selector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _handleDelete() {
        this._element.remove();
        this._element = null;
    }

    _handleLike() {
        this._element.querySelector('.button_type_like').classList.toggle('button_type_like-pressed');
    }

    _setEventListeners() {
        this._element.querySelector('.button_type_delete').addEventListener('click', () => {
            this._handleDelete();
        });

        this._element.querySelector('.button_type_like').addEventListener('click', () => {
            this._handleLike();
        });

        this._element.querySelector('.element__photo').addEventListener('click', this._handleCardClick);
    }

    generateCard() {
        this._element = this._getTemplate();
        const photo = this._element.querySelector('.element__photo');
        photo.src = this._url;
        photo.alt = "Фото: " + this._name;

        const gridBottom = this._element.querySelector('.element__bottom');
        gridBottom.querySelector('.element__title').textContent = this._name;

        this._setEventListeners();
        return this._element;
    }
}
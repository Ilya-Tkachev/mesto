const elements = document.querySelector('.elements');
const imagePopup = document.querySelector('#image-popup');
const imagePopupClose = imagePopup.querySelector('#image-popup_close');

export default class Card {
    constructor(data, selector) {
        this._url = data.link;
        this._name = data.name;
        this._selector = selector;
        this._liked = false;
    }

    _getTemplate() {
        return document
            .querySelector(this._selector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _handleDelete(event) {
        event.target.parentElement.remove();
        //elements.remove(event.target);
    }

    _handleLike(event) {
        event.target.classList.toggle('button_type_like-pressed');
        //this._element.like.classList.toggle('button_type_like-pressed');
    }

    _handleOpen() {
        const imagePopupImage = imagePopup.querySelector('.image-popup__image');
        imagePopupImage.src = this._url;
        imagePopupImage.alt = "Фото: " + this._name;

        const imagePopupText = imagePopup.querySelector('.image-popup__text');
        imagePopupText.textContent = this._name;

        imagePopup.classList.add('popup_state_opened');
    }

    _handleClose() {
        imagePopup.classList.remove('popup_state_opened');
    }

    _handleCloseOnEscape(event) {
        if (event.key === "Escape") {
            _handleClose();
        }
    }

    _setEventListeners() {
        this._element.querySelector('.button_type_delete').addEventListener('click', (event) => {
            console.log('delete');
            this._handleDelete(event);
        });

        this._element.querySelector('.button_type_like').addEventListener('click', (event) => {
            console.log('like');
            this._handleLike(event);
        });

        this._element.querySelector('.element__photo').addEventListener('click', () => {
            console.log('opne');
            this._handleOpen();
        });

        imagePopupClose.addEventListener('click', () => {
            console.log('close');
            this._handleClose();
        });

        this._element.addEventListener('click', (event) => {
            console.log('closeOnEscape');
            this._handleCloseOnEscape(event);
        });
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
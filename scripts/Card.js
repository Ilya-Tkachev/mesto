const imagePopup = document.querySelector('#image-popup');
const imagePopupClose = imagePopup.querySelector('#image-popup_close');

export default class Card {
    constructor(data, selector) {
        this._url = data.link;
        this._name = data.name;
        this._selector = selector;
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

    _handleClose() {
        imagePopup.classList.remove('popup_state_opened');
        document.removeEventListener('keydown', this._handleCloseOnEscape);
        imagePopupClose.removeEventListener('click', this._handleClose);
        imagePopup.removeEventListener('click', this._handleCloseOnOverlay);
    }

    _handleCloseOnEscape(event) {
        if (event.key === "Escape") {
            imagePopup.classList.remove('popup_state_opened');
            document.removeEventListener('keydown', this._handleCloseOnEscape);
            imagePopupClose.removeEventListener('click', this._handleClose);
            imagePopup.removeEventListener('click', this._handleCloseOnOverlay);
        }
    }

    _handleCloseOnOverlay(event) {
        if (event.target.classList.contains('popup')) {
            imagePopup.classList.remove('popup_state_opened');
            document.removeEventListener('keydown', this._handleCloseOnEscape);
            imagePopupClose.removeEventListener('click', this._handleClose);
            imagePopup.removeEventListener('click', this._handleCloseOnOverlay);
        }
    }

    _handleOpen() {
        const imagePopupImage = imagePopup.querySelector('.image-popup__image');
        imagePopupImage.src = this._url;
        imagePopupImage.alt = "Фото: " + this._name;

        const imagePopupText = imagePopup.querySelector('.image-popup__text');
        imagePopupText.textContent = this._name;

        imagePopup.classList.add('popup_state_opened');

        imagePopupClose.addEventListener('click', this._handleClose);
        document.addEventListener('keydown', this._handleCloseOnEscape);
        imagePopup.addEventListener('click', this._handleCloseOnOverlay);
    }

    _setEventListeners() {
        this._element.querySelector('.button_type_delete').addEventListener('click', () => {
            this._handleDelete();
        });

        this._element.querySelector('.button_type_like').addEventListener('click', () => {
            this._handleLike();
        });

        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._handleOpen();
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
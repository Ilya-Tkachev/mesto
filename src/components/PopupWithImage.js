import Popup from './Popup.js';

const imagePopup = document.querySelector('#image-popup');

export default class PopupWithImage extends Popup {
    constructor(popupSelector, url, name) {
        super(popupSelector);
        this._url = url;
        this._name = name;
        this._imagePopupImage = imagePopup.querySelector('.image-popup__image');
        this._imagePopupText = imagePopup.querySelector('.image-popup__text');
    }

    open() {
        this._imagePopupImage.src = this._url;
        this._imagePopupImage.alt = "Фото: " + this._name;
        this._imagePopupText.textContent = this._name;
        super.open();
    }

}
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopupImage = document.querySelector('#image-popup').querySelector('.image-popup__image');
        this._imagePopupText = document.querySelector('#image-popup').querySelector('.image-popup__text');
    }

    open(url, name) {
        this._imagePopupImage.src = url;
        this._imagePopupImage.alt = "Фото: " + name;
        this._imagePopupText.textContent = name;
        super.open();
    }

}
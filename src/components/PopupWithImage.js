import Popup from './Popup.js';

const imagePopup = document.querySelector('#image-popup');

export default class PopupWithImage extends Popup {
    constructor(popupSelector, url, name) {
        super(popupSelector);
        this._url = url;
        this._name = name;
    }

    open() {
        const imagePopupImage = imagePopup.querySelector('.image-popup__image');
        imagePopupImage.src = this._url;
        imagePopupImage.alt = "Фото: " + this._name;
        
        const imagePopupText = imagePopup.querySelector('.image-popup__text');
        imagePopupText.textContent = this._name;

        super.open();
    }

}
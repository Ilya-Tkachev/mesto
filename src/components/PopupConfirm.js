import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor({popupSelector, formSubmit}) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._submitButton = this._popup.querySelector('.button_type_save');
    }

    _setEventListeners() {
        this._submitButton.addEventListener('click', this._formSubmit);
        super._setEventListeners();
    }

}
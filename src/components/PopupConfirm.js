import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._submitButton = this._popup.querySelector('.button_type_save');
    }

    _setEventListeners() {
        this._submitButton.addEventListener('click', this._formSubmit);
        super._setEventListeners();
    }

    setNewSubmitHandler({formSubmit}) {
        this._formSubmit = formSubmit;
    }

}
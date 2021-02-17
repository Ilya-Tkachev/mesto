import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._submitButton = this._popup.querySelector('.button_type_save');
    }

    open() {
        this._submitButton.addEventListener('click', this._formSubmit);
        super.open();
    }

    close() {
        this._submitButton.removeEventListener('click', this._formSubmit);
        super.close();
    }

    setNewSubmitHandler({formSubmit}) {
        this._formSubmit = formSubmit;
    }

}
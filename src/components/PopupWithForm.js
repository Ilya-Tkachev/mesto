import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, formSubmit }) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._submitButton = this._popup.querySelector('.button_type_save');
        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._popupForm = this._popup.querySelector('.form');
    }

    getInputValues() {
        this._formValues = {};
        this._inputs.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    _setEventListeners() {
        this._submitButton.addEventListener('click', this._formSubmit);
        super._setEventListeners();
    }

    fillInForms(dataToFillForm) {
        this._inputs[0].value = dataToFillForm[0];
        this._inputs[1].value = dataToFillForm[1];
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

    changeButtonName(newName) {
        this._submitButton.textContent = newName;
    }

}
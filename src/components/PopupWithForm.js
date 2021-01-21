import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, formSubmit, userInfo }) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._userInfo = userInfo;
        this._submitButton = this._popup.querySelector('.button_type_save');
        this._inputs = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        return this._inputs.map(input => {
            input.value;
        });
    }

    _setEventListeners() {
        this._submitButton.addEventListener('click', this._formSubmit);
        super._setEventListeners();
    }

    open() {
        this._resetForm(this._popup.querySelector('.form'));
        if (this._isProfilePopup()) {
            const info = this._userInfo.getUserInfo();
            this._inputs[0].value = info.name;
            this._inputs[1].value = info.info;
        }
        super.open();
    }

    _isProfilePopup() { return this._popup.id === 'profile-popup' }

    _resetForm(form) {
        form.reset();
        form.querySelectorAll('.popup__input').forEach(input => {
            input.classList.remove('form__input_type_error');
        })
        form.querySelectorAll('.form__input-error').forEach(error => {
            error.textContent = "";
        });
    }

}
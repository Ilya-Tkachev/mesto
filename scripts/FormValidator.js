const editProfileForm = document.querySelector('#profile-form');
const addCardForm = document.querySelector('#photo-form');

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inputInvalidClass: 'form__input_type_error',
    buttonInvalidClass: 'button__inactive',
    photoFormClass: 'photo-form'
};

class FormValidator {
    constructor(selectors, form, name) {
        this._name = name;
        this._formSelector = selectors.formSelector;
        this._inputSelector = selectors.inputSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inputInvalidClass = selectors.inputInvalidClass;
        this._buttonInvalidClass = selectors.buttonInvalidClass;
        this._photoFormClass = selectors.photoFormClass;
        this._form = form;
    }

    _showError(input) {
        input.classList.add(this._inputInvalidClass);
        const error = this._form.querySelector(`#${input.id}-input-error`);
        error.textContent = input.validationMessage;
    };

    _hideError(input) {
        input.classList.remove(this._inputInvalidClass);
        const error = this._form.querySelector(`#${input.id}-input-error`);
        error.textContent = "";
    };

    _isValid(input) {
        if (!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }

    _setButtonState(button, isActive) {
        if (isActive) {
            button.classList.remove(this._buttonInvalidClass);
            button.disabled = false;
        } else {
            button.classList.add(this._buttonInvalidClass);
            button.disabled = true;
        }
    }

    _setEventListeners(form) {
        const inputs = form.querySelectorAll(this._inputSelector);
        const submitButton = form.querySelector(this._submitButtonSelector);
        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._isValid(input);
                this._setButtonState(submitButton, this._form.checkValidity());
            });
        });
    }

    _isPhotoForm(form) {
        return form.id === this._photoFormClass;
    }

    _initialButtonSet(form) {
        const submitButton = form.querySelector(this._submitButtonSelector);
        if (this._isPhotoForm(form)) {
            this._setButtonState(submitButton, false);
        } else {
            this._setButtonState(submitButton, true);
        }
    }

    enableValidation() {
        this._setEventListeners(this._form);
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            if (this._isPhotoForm(this._form)) {
                const submitButton = this._form.querySelector(this._submitButtonSelector);
                this._setButtonState(submitButton, this._form.checkValidity());
            }
        });
        this._initialButtonSet(this._form);
    }
}

export default function initValidation() {    
    const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm, 'editProfileFormValidator');
    editProfileFormValidator.enableValidation();

    const addCardFormValidator = new FormValidator(validationConfig, addCardForm, 'addCardFormValidator');
    addCardFormValidator.enableValidation();
}
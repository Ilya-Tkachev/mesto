export default class FormValidator {
    constructor(selectors, form) {
        this._inputSelector = selectors.inputSelector;
        this._inputInvalidClass = selectors.inputInvalidClass;
        this._buttonInvalidClass = selectors.buttonInvalidClass;
        this._photoFormClass = selectors.photoFormClass;
        this._avatarFormClass = selectors.avatarFormClass;
        this._submitButton = form.querySelector(selectors.submitButtonSelector);
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
        const inputErrors = form.querySelectorAll('.form__input-error');
        
        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._isValid(input);
                this._setButtonState(this._submitButton, this._form.checkValidity());
            });
        });

        this._form.addEventListener('reset', () => {
            inputs.forEach(input => input.classList.remove('form__input_type_error'));
            inputErrors.forEach(error => error.textContent = "");
            this._setButtonState(this._submitButton, false);
        });
    }

    enableValidation() {
        this._setEventListeners(this._form);
        this._setButtonState(this._submitButton, false);
    }
}
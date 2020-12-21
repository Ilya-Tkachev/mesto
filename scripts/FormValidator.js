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
    /* 
    Для каждого попапа с формой следует создать свой валидатор с уникальным именем. 
    Включение валидации, соответсвенно, также происходит по отдельности для каждого попапа.

    Не понимаю замечание, ведь у меня реализовано именно то, что вы требуете.
    allForms содержи в себе 2 элемента, форму из попапа редактирования профиля и форму из попапа добавления картинок
    в цикле с начала для первой формы из попапа редактирования профиля создаем валидатор, и включаем валидацию
    потом для второй формы из попапа добавления картинок включаем создаем валидатор, и включаем валидацию
    Может вас смутило имя переменной form? form это не сам инпут, это 2 инпута + кнопка сабмита.
    Валидация не целиком на попапе, а на форме попапа.
    */
    let counter = 0;
    const allForms = document.querySelectorAll(validationConfig.formSelector);
    allForms.forEach(form => {
        const formValidator = new FormValidator(validationConfig, form, `Name${counter}`);
        formValidator.enableValidation();
        ++counter;
    });
}
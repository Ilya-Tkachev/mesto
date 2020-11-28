function showError(form, input, config) {
    input.classList.add(config.inputInvalidClass);
    const error = form.querySelector(`#${input.id}-input-error`);
    error.textContent = input.validationMessage;
};

function hideError(form, input, config) {
    input.classList.remove(config.inputInvalidClass);
    const error = form.querySelector(`#${input.id}-input-error`);
    error.textContent = "";
};

function checkInputValidity(form, input, config) {
    if (!input.validity.valid) {
        showError(form, input, config);
    } else {
        hideError(form, input, config);
    }
};

function setButtonState(button, isActive, config) {
    if (isActive) {
        button.classList.remove(config.buttonInvalidClass);
        button.disabled = false;
    } else {
        button.classList.add(config.buttonInvalidClass);
        button.disabled = true;
    }
}

const isPhotoForm = (form, config) => form.id === config.photoFormClass;

function setEventListeners(form, config) {
    const inputsList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        if (isPhotoForm(form, config)) {
            form.reset();
            setButtonState(submitButton, form.checkValidity(), config);
        }
    });

    inputsList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, config);
            setButtonState(submitButton, form.checkValidity(), config);
        });
    });
}

function initialButtonSet(form, config) {
    const submitButton = form.querySelector(config.submitButtonSelector);
    if (isPhotoForm(form, config)) {
        setButtonState(submitButton, false, config)
    } else {
        setButtonState(submitButton, true, config)
    }
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((form) => {
        setEventListeners(form, config);
        initialButtonSet(form, config);
    });
}

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inputInvalidClass: 'form__input_type_error',
    buttonInvalidClass: 'button__inactive',
    photoFormClass: 'photo-form'
};

enableValidation(validationConfig);
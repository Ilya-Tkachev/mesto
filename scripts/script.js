import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initial-сards.js';

const profilePopup = document.querySelector('#profile-popup');
const profileForm = document.querySelector('#profile-form');
const profileFieldName = document.querySelector('.profile__heading');
const profileFieldInfo = document.querySelector('.profile__description');
const popupFieldName = document.querySelector('#profile-form-name');
const popupFieldInfo = document.querySelector('#profile-form-info');

const addPhotoPopup = document.querySelector('#photo_add');
const addPhotoFormElement = document.querySelector('#photo-form');
const addPhotoName = document.querySelector('#photo-form-name');
const addPhotoUrl = document.querySelector('#photo-form-url');

const elements = document.querySelector('.elements');

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inputInvalidClass: 'form__input_type_error',
    buttonInvalidClass: 'button__inactive',
    photoFormClass: 'photo-form'
};

function createCard(elementToAdd) {
    const card = new Card(elementToAdd, '#element_template');
    return card.generateCard();
}

function fillPhotoGrid(elementsToAdd) {
    elementsToAdd.forEach(elementToAdd => elements.prepend(createCard(elementToAdd)));
}

const closePopup = function (popupToClose) {
    popupToClose.classList.remove('popup_state_opened');
    document.removeEventListener('keydown', closePopUpOnEscape);
    popupToClose.querySelector('.button_type_close').removeEventListener('click', closePopUpOnCloseButton);
    popupToClose.removeEventListener('click', closePopUpOnOverlay);
}

const closePopUpOnEscape = function (event) {
    if (event.key === "Escape") closePopup(document.querySelector('.popup_state_opened'));
}

const closePopUpOnOverlay = function (event) {
    if (event.target.classList.contains('popup')) closePopup(event.target.closest('.popup'));
}

const closePopUpOnCloseButton = function (event) {
    closePopup(event.target.closest('.popup'));
}

function openPopup(popup) {
    popup.classList.add('popup_state_opened');
    document.addEventListener('keydown', closePopUpOnEscape);
    popup.querySelector('.button_type_close').addEventListener('click', closePopUpOnCloseButton);
    popup.addEventListener('click', closePopUpOnOverlay);
}

const openProfilePopup = () => {
    resetForm(profileForm);
    popupFieldName.value = profileFieldName.textContent;
    popupFieldInfo.value = profileFieldInfo.textContent;
    openPopup(profilePopup);
}

function resetForm(form) {
    form.reset();
    form.querySelectorAll('.popup__input').forEach(input => {
        input.classList.remove('form__input_type_error');
    })
    form.querySelectorAll('.form__input-error').forEach(error => {
        error.textContent = "";
    });
}

const openAddPhoto = () => {
    resetForm(addPhotoFormElement);
    openPopup(addPhotoPopup);
};

function formSubmitHandler(event) {
    event.preventDefault()
    profileFieldName.textContent = popupFieldName.value;
    profileFieldInfo.textContent = popupFieldInfo.value;
    closePopup(profilePopup);
}

function addElement(event) {
    event.preventDefault()
    const photoName = addPhotoName.value;
    const photoUrl = addPhotoUrl.value;
    fillPhotoGrid([
        {
            name: photoName,
            link: photoUrl
        }
    ]);
    addPhotoFormElement.reset();
    closePopup(addPhotoPopup);
}

function initValidation() {
    const editProfileFormValidator = new FormValidator(validationConfig, profileForm);
    editProfileFormValidator.enableValidation();

    const addCardFormValidator = new FormValidator(validationConfig, addPhotoFormElement);
    addCardFormValidator.enableValidation();
}

function initPage() {
    document.querySelector('.button_type_eddit').addEventListener('click', openProfilePopup);
    document.querySelector('#profile-form').addEventListener('submit', event => formSubmitHandler(event));
    document.querySelector('.button_type_add').addEventListener('click', openAddPhoto);
    addPhotoFormElement.addEventListener('submit', event => addElement(event));
    fillPhotoGrid(initialCards);
    initValidation();
}

initPage();
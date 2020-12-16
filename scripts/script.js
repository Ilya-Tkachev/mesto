import Card from './Card.js';
import initValidation from './FormValidator.js';

const profilePopup = document.querySelector('#profile-popup');
const profileFieldName = document.querySelector('.profile__heading');
const profileFieldInfo = document.querySelector('.profile__description');
const popupFieldName = document.querySelector('#profile-form-name');
const popupFieldInfo = document.querySelector('#profile-form-info');

const addPhotoPopup = document.querySelector('#photo_add');
const addPhotoFormElement = document.querySelector('#photo-form');
const addPhotoName = document.querySelector('#photo-form-name');
const addPhotoUrl = document.querySelector('#photo-form-url');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function fillPhotoGrid(elementsToAdd) {
    const elements = document.querySelector('.elements');
    elementsToAdd.forEach(elementToAdd => {
        const card = new Card(elementToAdd, '#element_template');
        const cardElement = card.generateCard();
        elements.prepend(cardElement);
    });
}

const closePopup = function (event, popup) {
    const popupToClose = popup || event.target.closest('.popup');
    popupToClose.classList.remove('popup_state_opened');
    document.removeEventListener('keydown', closePopUpOnEscape);
    popupToClose.querySelector('.button_type_close').removeEventListener('click', closePopup);
    popupToClose.removeEventListener('click', closePopup);
}

const closePopUpOnEscape = function (event) {
    if (event.key === "Escape") {
        const popup = document.querySelector('.popup_state_opened');
        closePopup(event, popup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_state_opened');
    document.addEventListener('keydown', closePopUpOnEscape);
    popup.querySelector('.button_type_close').addEventListener('click', closePopup);
    popup.addEventListener('click', closePopup);
}

const openProfilePopup = () => {
    popupFieldName.value = profileFieldName.textContent;
    popupFieldInfo.value = profileFieldInfo.textContent;
    openPopup(profilePopup);
}

const openAddPhoto = () => openPopup(addPhotoPopup);

function formSubmitHandler(event) {
    event.preventDefault()
    profileFieldName.textContent = popupFieldName.value;
    profileFieldInfo.textContent = popupFieldInfo.value;
    closePopup(event, profilePopup);
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
    closePopup(event, addPhotoPopup);
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
const profilePopup = document.querySelector('#profile-popup');
const profileFieldName = document.querySelector('.profile__heading');
const profileFieldInfo = document.querySelector('.profile__description');
const popupFieldName = document.querySelector('#profile-form-name');
const popupFieldInfo = document.querySelector('#profile-form-info');

const addPhotoPopup = document.querySelector('#photo_add');
const addPhotoFormElement = document.querySelector('#photo-form');
const addPhotoName = document.querySelector('#photo-form-name');
const addPhotoUrl = document.querySelector('#photo-form-url');

const imagePopup = document.querySelector('#image-popup');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupText = imagePopup.querySelector('.image-popup__text');
const elements = document.querySelector('.elements');

const closeButtons = document.querySelectorAll('.button_type_close')

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

function fillPhotoGrid(cards) {
    cards.forEach(card => {
        const gridElement = creareCard(card);
        elements.prepend(gridElement);
    });
}

function creareCard(card) {
    const gridElement = document.querySelector('#element_template').content.cloneNode(true);
    const photo = gridElement.querySelector('.element__photo');
    photo.src = card.link;
    photo.alt = "Фото: " + card.name;
    const gridBottom = gridElement.querySelector('.element__bottom');
    gridBottom.querySelector('.element__title').textContent = card.name;
    gridElement.querySelector('.button_type_delete').addEventListener('click', deleteElement);
    gridBottom.querySelector('.button_type_like').addEventListener('click', likeElement);
    photo.addEventListener('click', () => openImagePopup(card));
    return gridElement;
}

const closePopUpOnEscape = function (evt, popup) {
    if (evt.key === "Escape") {
        closePopup(popup);
    }
}

const closePopup = function (popup) {
    popup.classList.remove('popup_state_opened');
    document.removeEventListener('keydown', closePopUpOnEscape);
}

function openPopup(popup) {
    popup.classList.add('popup_state_opened');
    document.addEventListener('keydown', (evt) => closePopUpOnEscape(evt, popup));
}

function makeBackgroundsClosable() { 
    const backgrounbs = document.querySelectorAll('.popup'); 
    backgrounbs.forEach(background => background.addEventListener('click', (evt) => closePopup(evt.target))); 
}

const openProfilePopup = () => {
    popupFieldName.value = profileFieldName.textContent;
    popupFieldInfo.value = profileFieldInfo.textContent;
    openPopup(profilePopup);
}

function formSubmitHandler() {
    profileFieldName.textContent = popupFieldName.value;
    profileFieldInfo.textContent = popupFieldInfo.value;
    closePopup(profilePopup);
}

function likeElement(event) {
    event.target.classList.toggle('button_type_like-pressed');
}

function deleteElement(event) {
    event.target.parentElement.remove();
}

const openAddPhoto = () => openPopup(addPhotoPopup);

function addElement() {
    const photoName = addPhotoName.value;
    const photoUrl = addPhotoUrl.value;
    fillPhotoGrid([
        {
            name: photoName,
            link: photoUrl
        }
    ]);
    closePopup(addPhotoPopup);
}

function openImagePopup(card) {
    imagePopupImage.src = card.link;
    imagePopupImage.alt = "Фото: " + card.name;
    imagePopupText.textContent = card.name;
    openPopup(imagePopup);
}

function initPage() {
    closeButtons.forEach(button => button.addEventListener('click', event => closePopup(event.target.closest('.popup')))); 
    document.querySelector('.button_type_eddit').addEventListener('click', openProfilePopup);
    document.querySelector('#profile-form').addEventListener('submit', formSubmitHandler);
    document.querySelector('.button_type_add').addEventListener('click', openAddPhoto);
    addPhotoFormElement.addEventListener('submit', addElement);
    makeBackgroundsClosable();
    fillPhotoGrid(initialCards);
}

initPage();
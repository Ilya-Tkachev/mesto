const profileFieldName = document.querySelector('.profile__heading');
const profileFieldInfo = document.querySelector('.profile__description');

const popup = document.querySelector('.popup');
const popupFieldName = document.querySelector('#popup_field_name');
const popupFieldInfo = document.querySelector('#popup_field_info');

const addPhotoPopup = document.querySelector('#photo_add');
const addPhotoFormElement = document.querySelector('#photo_add_form');

const imagePopup = document.querySelector('#image-popup');

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
    cards.forEach(function (card) {
        const gridElement = document.querySelector('#element_template').content.cloneNode(true);

        const photo = gridElement.querySelector('.element__photo');
        photo.src = card.link;
        photo.alt = "Фото: " + card.name;
        const gtidBottom = gridElement.querySelector('.element__bottom');
        gtidBottom.querySelector('.element__title').textContent = card.name;

        const buttonTypeDelete = gridElement.querySelector('.button_type_delete');
        buttonTypeDelete.addEventListener('click', deleteElement);

        const buttonTypeLike = gtidBottom.querySelector('.button_type_like');
        buttonTypeLike.addEventListener('click', likeElement);

        photo.addEventListener('click', openImagePopup);

        document.querySelector('.elements').prepend(gridElement);
    });
}

function openPopup() {
    popupFieldName.value = profileFieldName.textContent;
    popupFieldInfo.value = profileFieldInfo.textContent;
    popup.classList.remove('popup_state_closed');
    popup.classList.add('popup_state_opened');
    popupFieldName.focus();
}

function closePopup() {
    popup.classList.remove('popup_state_opened');
    popup.classList.add('popup_state_closed');
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler(event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
    profileFieldName.textContent = popupFieldName.value;
    profileFieldInfo.textContent = popupFieldInfo.value;
    closePopup();
}

function likeElement(event) {
    event.target.classList.toggle('button_type_like-pressed');
}

function deleteElement(event) {
    event.target.parentElement.remove();
}

function openAddPhoto() {
    addPhotoPopup.classList.remove('popup_state_closed');
    addPhotoPopup.classList.add('popup_state_opened');
    popupFieldName.focus();
}

function closeAddPhoto() {
    addPhotoPopup.classList.remove('popup_state_opened');
    addPhotoPopup.classList.add('popup_state_closed');
}

function addElement(event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
    const photoName = document.querySelector('#photo_add_name').value;
    const photoUrl = document.querySelector('#photo_add_url').value;
    if (photoName != null && photoUrl != null) {
        fillPhotoGrid([
            {
                name: photoName, 
                link: photoUrl
            }
        ]);
        addPhotoFormElement.reset();
    }
    closeAddPhoto();
}

function openImagePopup(event) {
    const imageClicked = event.target;
    const popupImage = imagePopup.querySelector('.image-popup__image');
    popupImage.src = imageClicked.src;
    popupImage.alt = imageClicked.alt;
    imagePopup.querySelector('.image-popup__text').textContent = imageClicked.alt.split(' ')[1];
    imagePopup.classList.remove('popup_state_closed');
    imagePopup.classList.add('popup_state_opened');
}

function closeImagePopup(){
    imagePopup.classList.remove('popup_state_opened');
    imagePopup.classList.add('popup_state_closed');
}

fillPhotoGrid(initialCards);

document.querySelector('.button_type_eddit').addEventListener('click', openPopup);
document.querySelector('.button_type_close').addEventListener('click', closePopup);
document.querySelector('#profile-form').addEventListener('submit', formSubmitHandler);

document.querySelector('.button_type_add').addEventListener('click', openAddPhoto);
document.querySelector('#photo_add_close').addEventListener('click', closeAddPhoto);
addPhotoFormElement.addEventListener('submit', addElement);

document.querySelector('#image-popup_close').addEventListener('click', closeImagePopup);
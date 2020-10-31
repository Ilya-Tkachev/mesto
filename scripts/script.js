const profileFieldName = document.querySelector('.profile__heading');
const profileFieldInfo = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.button_type_eddit');

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.button_type_close');
const popupFieldName = document.querySelector('#popupFieldName');
const popupFieldInfo = document.querySelector('#popupFieldInfo');
const popupSaveButton = document.querySelector('.button_type_save');

function openPopup() {
    popupFieldName.value = profileFieldName.textContent;
    popupFieldInfo.value = profileFieldInfo.textContent;
    popup.classList.remove('popup_state_closed');
    popupFieldName.focus();
}

function closePopup() {
    popup.classList.add('popup_state_closed');
}

function isPopupOpened() {
    return !popup.classList.contains('popup_state_closed');
}

function savePopupChanges() {
    profileFieldName.textContent = popupFieldName.value;
    profileFieldInfo.textContent = popupFieldInfo.value;
    closePopup();
}

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

popupSaveButton.addEventListener('click', savePopupChanges);

document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && isPopupOpened()) {
        savePopupChanges();
    }
});
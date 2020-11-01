const profileFieldName = document.querySelector('.profile__heading');
const profileFieldInfo = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.button_type_eddit');

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.button_type_close');
const popupFieldName = document.querySelector('#popup_field_name');
const popupFieldInfo = document.querySelector('#popup_field_info');
const formElement = document.querySelector('#profile-form');

function openPopup() {
    popupFieldName.value = profileFieldName.textContent;
    popupFieldInfo.value = profileFieldInfo.textContent;
    popup.classList.remove('popup_state_closed');
    popupFieldName.focus();
}

function closePopup() {
    popup.classList.add('popup_state_closed');
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
    profileFieldName.textContent = popupFieldName.value;
    profileFieldInfo.textContent = popupFieldInfo.value;
    closePopup();
}

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'
import PopupConfirm from '../components/PopupConfirm';

const profileForm = document.querySelector('#profile-form');
const popupFieldName = document.querySelector('#profile-form-name');
const popupFieldInfo = document.querySelector('#profile-form-info');

const addPhotoFormElement = document.querySelector('#photo-form');
const addPhotoName = document.querySelector('#photo-form-name');
const addPhotoUrl = document.querySelector('#photo-form-url');

const avatarForm = document.querySelector('#avatar-form');
const avatarPhotoUrl = document.querySelector('#avatar-form-url');

const avatarButton = document.querySelector('.profile__avatar-howered');

const addButton = document.querySelector('.button_type_add');
const edditButton = document.querySelector('.button_type_eddit');

const elements = document.querySelector('.elements');

const basicAddress = 'https://mesto.nomoreparties.co/v1';
const groupId = 'cohort-19';
const token = 'f34b9e72-50da-445a-b7b3-13b02dd853f1';
const saveInProgress = 'Сохранение...';
const save = 'Сохранить';

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inputInvalidClass: 'form__input_type_error',
    buttonInvalidClass: 'button__inactive',
    photoFormClass: 'photo-form',
    avatarFormClass: 'avatar-form'
};

function initValidation() {
    const editAvatarFormValidator = new FormValidator(validationConfig, avatarForm);
    editAvatarFormValidator.enableValidation();

    const editProfileFormValidator = new FormValidator(validationConfig, profileForm);
    editProfileFormValidator.enableValidation();

    const addCardFormValidator = new FormValidator(validationConfig, addPhotoFormElement);
    addCardFormValidator.enableValidation();
    return {
        editAvatarForm: editAvatarFormValidator,
        editProfileForm: editProfileFormValidator,
        addCardForm: addCardFormValidator
    }
}

function initPage() {
    const api = new Api(
        {
            address: basicAddress,
            token: token,
            groupId: groupId
        }
    );

    const userInfo = new UserInfo('.profile__heading', '.profile__description', '.profile__avatar');
    api.getUserInfo()
        .then(response => userInfo.init(response))
        .catch(err => console.log(err));

    const imagePopup = new PopupWithImage('#image-popup');

    const confirmationPopup = new PopupConfirm('#photo_delete');

    const initSection = new Section(
        {
            renderer: (elementToAdd, userInfo) => {
                const card = new Card(
                    {
                        data: elementToAdd,
                        selector: '#element_template',
                        handleCardClick: () => imagePopup.open(elementToAdd.link, elementToAdd.name),
                        handleDelete: () => {
                            confirmationPopup.setNewSubmitHandler({
                                formSubmit: (event) => {
                                    event.preventDefault();
                                    api.deleteCard(card.getId())
                                        .then(card.remove())
                                        .then(confirmationPopup.close())
                                        .catch(err => console.log(err));
                                }
                            });
                            confirmationPopup.open();
                        },
                        handleLike: () => {
                            if (card.isLikedByMe(userInfo)) {
                                api.dislikeCard(card._id)
                                    .then(result => card.toggleLike(result, userInfo))
                                    .catch(err => console.log(err));
                            } else {
                                api.likeCard(card._id)
                                    .then(result => card.toggleLike(result, userInfo))
                                    .catch(err => console.log(err));
                            }
                        }
                    }
                );
                return card.generateCard(userInfo);
            }
        },
        elements
    );
    api.getCardsData()
        .then(initialCards => initSection.rendererAll(initialCards, userInfo.getUserInfo()))
        .catch(err => console.log(err));
    const forms = initValidation();

    const avatarForm = new PopupWithForm(
        {
            popupSelector: '#avatar-popup',
            formSubmit: (event) => {
                event.preventDefault();
                avatarForm.changeButtonName(saveInProgress);
                api.changeAvatar(avatarPhotoUrl.value)
                    .then(userInfo.updateAvatar(avatarPhotoUrl.value))
                    .then(avatarForm.changeButtonName(save))
                    .then(avatarForm.close())
                    .catch(err => console.log(err));
            }
        }
    );
    avatarButton.addEventListener('click', () => { avatarForm.open(); });

    const userInfoForm = new PopupWithForm(
        {
            popupSelector: '#profile-popup',
            formSubmit: (event) => {
                event.preventDefault();
                userInfoForm.changeButtonName(saveInProgress);
                api.updateUserInfo(popupFieldName.value, popupFieldInfo.value)
                    .then(response => userInfo.setUserInfo(response))
                    .then(userInfoForm.changeButtonName(save))
                    .then(userInfoForm.close())
                    .catch(err => console.log(err));
            }
        }
    );
    edditButton.addEventListener('click', () => {
        const userData = userInfo.getUserInfo();
        userInfoForm.fillInForms([userData.name, userData.about]);
        userInfoForm.open(); 
    });

    const photoForm = new PopupWithForm(
        {
            popupSelector: '#photo_add',
            formSubmit: (event) => {
                event.preventDefault();
                photoForm.changeButtonName(saveInProgress);
                api.saveCard(addPhotoName.value, addPhotoUrl.value)
                    .then(response => initSection.addItem(response, userInfo.getUserInfo()))
                    .then(photoForm.changeButtonName(save))
                    .then(photoForm.close())
                    .catch(err => console.log(err));
            }
        }
    );
    addButton.addEventListener('click', () => { photoForm.open(); });
}

initPage();
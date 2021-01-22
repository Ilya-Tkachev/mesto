import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/initial-сards.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

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

const addButton = document.querySelector('.button_type_add');
const edditButton = document.querySelector('.button_type_eddit');

const elements = document.querySelector('.elements');

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inputInvalidClass: 'form__input_type_error',
    buttonInvalidClass: 'button__inactive',
    photoFormClass: 'photo-form'
};

function initValidation() {
    const editProfileFormValidator = new FormValidator(validationConfig, profileForm);
    editProfileFormValidator.enableValidation();

    const addCardFormValidator = new FormValidator(validationConfig, addPhotoFormElement);
    addCardFormValidator.enableValidation();
    return {
        editProfileForm: editProfileFormValidator,
        addCardForm: addCardFormValidator
    }
}

function initPage() {
    const initSection = new Section(
        {
            data: initialCards,
            renderer: (elementToAdd) => {
                const card = new Card(
                    {
                        data: elementToAdd,
                        selector: '#element_template',
                        handleCardClick: () => {
                            const userInfoForm = new PopupWithImage('#image-popup', elementToAdd.link, elementToAdd.name);
                            userInfoForm.open();
                        }
                    }
                );
                return card.generateCard();
            }
        },
        elements
    );
    initSection.rendererAll();
    const forms = initValidation();

    const userInfo = new UserInfo('.profile__heading', '.profile__description');

    const userInfoForm = new PopupWithForm(
        {
            popupSelector: '#profile-popup',
            formSubmit: (event) => {
                event.preventDefault();
                userInfo.setUserInfo(popupFieldName.value, popupFieldInfo.value);
                userInfoForm.close();
            },
            userInfo: () => { return userInfo.getUserInfo(); }
        }
    );
    edditButton.addEventListener('click', () => { userInfoForm.open(); });
    edditButton.addEventListener('click', () => { forms.editProfileForm.initialButtonSet(); });

    const photoForm = new PopupWithForm(
        {
            popupSelector: '#photo_add',
            formSubmit: (event) => {
                event.preventDefault();
                const data = { name: addPhotoName.value, link: addPhotoUrl.value };
                initSection.addItem(data);
                photoForm.close();
            }
        }
    );
    addButton.addEventListener('click', () => { photoForm.open(); });
    addButton.addEventListener('click', () => { forms.addCardForm.initialButtonSet(); });
}

initPage();
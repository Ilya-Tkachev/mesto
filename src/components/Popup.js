export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.button_type_close');
        this._handleEscClose = (event) => { if (event.key === "Escape") this.close(); }
        this._handleOverlayClose = (event) => { if (event.target.classList.contains('popup')) this.close(); }
        this._handleCloseButton = () => { this.close(); }
    }

    open() {
        this._popup.classList.add('popup_state_opened');
        this._setEventListeners();
    }

    _setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._handleOverlayClose);
        this._closeButton.addEventListener('click', this._handleCloseButton);
    }

    close() {
        this._popup.classList.remove('popup_state_opened');
        this._removeEventListeners();
    }

    _removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._handleOverlayClose);
        this._closeButton.removeEventListener('click', this._handleCloseButton);
    }
}
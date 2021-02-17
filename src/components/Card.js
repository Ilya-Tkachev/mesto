export default class Card {
    constructor({ data, selector, handleCardClick, handleDelete, handleLike, handleDislike }) {
        this._url = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._id = data._id;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._handleDelete = handleDelete;
        this._handleLike = handleLike;
        this._handleDislike = handleDislike;
    }

    _getTemplate() {
        return document
            .querySelector(this._selector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    remove() {
        this._element.remove();
        this._element = null;
    }

    getId() {
        return this._id;
    }

    isLikedByMe(userInfo) {
        return this._likes.some((like) => like._id === userInfo._id);
    }

    toggleLike(result, userInfo) {
        this._likes = result.likes;
        this._displayLikesCount(userInfo);
    }

    _setEventListeners() {
        this._element.querySelector('.button_type_like').addEventListener('click', this._handleLike);
        this._element.querySelector('.element__photo').addEventListener('click', this._handleCardClick);
        this._element.querySelector('.button_type_delete').addEventListener('click', this._handleDelete);
    }

    _isNotMyCard(userInfo) {
        return userInfo._id !== this._ownerId;
    }

    _displayLikesCount(userInfo) {
        const likeCounter = this._element.querySelector('.element___like-title');
        likeCounter.textContent = this._likes.length;
        if (this.isLikedByMe(userInfo)) {
            this._element.querySelector('.button_type_like').classList.add('button_type_like-pressed');
        } else {
            this._element.querySelector('.button_type_like').classList.remove('button_type_like-pressed');
        } 
    }

    generateCard(userInfo) {
        this._element = this._getTemplate();
        const photo = this._element.querySelector('.element__photo');
        photo.src = this._url;
        photo.alt = "Фото: " + this._name;

        if (this._isNotMyCard(userInfo)) {
            this._element.querySelector('.button_type_delete').classList.add('button__hiden');
        }

        const gridBottom = this._element.querySelector('.element__bottom');
        gridBottom.querySelector('.element__title').textContent = this._name;

        this._displayLikesCount(userInfo);

        this._setEventListeners();
        return this._element;
    }
}
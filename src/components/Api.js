export default class Api {
    constructor({ address, token, groupId }) {
        this._address = address;
        this._token = token;
        this._groupId = groupId;
        this._userPath = 'users/me';
        this._avatarPath = 'avatar';
        this._cardsPath = 'cards';
        this._likesPath = 'likes';
    }

    _status(response) {
        if (response.status === 200 || response.status === 202 || response.status === 204) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    _json(response) {
        return response.json();
    }

    _error(error) {
        console.log(`Ошибка. Запрос не выполнен. ${error}`);
    }

    _getHeaders() {
        return {
            headers: {
                authorization: this._token
            }
        };
    }

    _restGet(endpoint) {
        return fetch(`${this._address}/${this._groupId}/${endpoint}`, this._getHeaders())
            .then(this._status)
            .then(this._json)
            .then(data => data)
            .catch(this._error);
    }

    _patchHeaders(body) {
        return {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: body
        };
    }

    _restPatch(endpoint, body) {
        return fetch(`${this._address}/${this._groupId}/${endpoint}`, this._patchHeaders(body))
            .then(this._status)
            .then(this._json)
            .then(data => data)
            .catch(this._error);
    }

    getUserInfo() {
        return this._restGet(this._userPath);
    }

    updateUserInfo(name, about) {
        const body = JSON.stringify({
            name: name,
            about: about
        })
        return this._restPatch(this._userPath, body);
    }

    getCardsData() {
        return this._restGet(this._cardsPath);
    }

    _postHeaders(body) {
        return {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: body
        };
    }

    _restPost(endpoint, body) {
        return fetch(`${this._address}/${this._groupId}/${endpoint}`, this._postHeaders(body))
            .then(this._status)
            .then(this._json)
            .then(data => data)
            .catch(this._error);
    }

    saveCard(name, link) {
        const body = JSON.stringify({
            name: name,
            link: link
        })
        return this._restPost(this._cardsPath, body);
    }

    _deleteHeaders() {
        return {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        };
    }

    _restDelete(endpoint, id) {
        return fetch(`${this._address}/${this._groupId}/${endpoint}/${id}`, this._deleteHeaders())
            .then(this._status)
            .then(this._json)
            .then(data => data)
            .catch(this._error);
    }

    deleteCard(cardId) {
        return this._restDelete(this._cardsPath, cardId);
    }

    _putHeaders() {
        return {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        };
    }

    _restPut(endpoint, id) {
        return fetch(`${this._address}/${this._groupId}/${endpoint}/${id}`, this._putHeaders())
            .then(this._status)
            .then(this._json)
            .then(data => data)
            .catch(this._error);
    }

    likeCard(cardId) {
        return this._restPut(`${this._cardsPath}/${this._likesPath}`, cardId);
    }

    dislikeCard(cardId) {
        return this._restDelete(`${this._cardsPath}/${this._likesPath}`, cardId);
    }

    changeAvatar(avatarUrl) {
        const body = JSON.stringify({
            avatar: avatarUrl
        })
        return this._restPatch(`${this._userPath}/${this._avatarPath}`, body);   
    }
}
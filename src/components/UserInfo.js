export default class UserInfo {
    constructor(profileFieldName, profileFieldInfo, profileAvatar) {
        this._nameField = document.querySelector(profileFieldName);
        this._infoSelector = document.querySelector(profileFieldInfo);
        this._profileAvatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        return this._userInfo;
    }

    setUserInfo(data) {
        if(data) {
            this._userInfo = data;
        }
        this._nameField.textContent = this._userInfo.name;
        this._infoSelector.textContent = this._userInfo.about;
    }

    init(data) {
        this._userInfo = data;
        this._profileAvatar.src = this._userInfo.avatar;
        this._profileAvatar.alt = "Фото: " + this._userInfo.name;
        this.setUserInfo()
    }

    updateAvatar(avatarUrl) {
        this._profileAvatar.src = avatarUrl;
        this._profileAvatar.alt = `Фото: ${avatarUrl}`;
    }
}
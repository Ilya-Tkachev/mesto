export default class UserInfo {
    constructor(profileFieldName, profileFieldInfo) {
        this._nameField = document.querySelector(profileFieldName);
        this._infoSelector = document.querySelector(profileFieldInfo);
    }

    getUserInfo() {
        return {
            name: this._nameField.textContent,
            info: this._infoSelector.textContent
        }
    }

    setUserInfo(name, info) {
        this._nameField.textContent = name;
        this._infoSelector.textContent = info;
    }
}
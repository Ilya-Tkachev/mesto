export default class UserInfo {
    constructor(profileFieldName, profileFieldInfo) {
        this._nameSelector = profileFieldName;
        this._infoSelector = profileFieldInfo;
    }

    getUserInfo() {
        return {
            name: document.querySelector(this._nameSelector).textContent,
            info: document.querySelector(this._infoSelector).textContent
        }
    }

    setUserInfo(name, info) {
        document.querySelector(this._nameSelector).textContent = name;
        document.querySelector(this._infoSelector).textContent = info;
    }
}
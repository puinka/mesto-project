import {
  profileUserName,
  profileUserOccupation,
  profileAvatar,
} from "../utils/constants.js";

// имя пользователя, занятие и аватар
export default class UserInfo {
  constructor() {
    this._userNameElement = profileUserName;
    this._userAboutElement = profileUserOccupation;
    this._userAvatarElement = profileAvatar;
  }

  getUserInfo(data) {
    this._name = data.name;
    this._about = data.about;
    this._avatar = data.avatar;
  }

  renderProfileInfo() {
    this._userNameElement.textContent = this._name;
    this._userAboutElement.textContent = this._about;
  }

  renderAvatar() {
    this._userAvatarElement.src = this._avatar;
  }
}

export default class UserInfo {
  constructor(selector) {
    this._userNameElement = document.querySelector(selector.profileUserName);
    this._userAboutElement = document.querySelector(
      selector.profileUserOccupation
    );
    this._userAvatarElement = document.querySelector(selector.profileAvatar);
  }

  getUserInfo() {
    const userValues = {
      name: this._userNameElement.textContent,
      about: this._userAboutElement.textContent,
    };
    return userValues;
  }

  setUserInfo(data) {
    this._name = data.name;
    this._about = data.about;
    this._avatar = data.avatar;
  }

  renderProfileInfo() {
    this._userNameElement.textContent = this._name;
    this._userAboutElement.textContent = this._about;
  }

  renderAvatar(data) {
    this._userAvatarElement.src = data.avatar;
  }
}

export default class UserInfo {
  constructor({
    profileNameSelector,
    profileAboutSelector,
    profileAvatarSelector,
  }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    const result = {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
    };
    return result;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
    this.userID = data.userID;
  }

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }

  getUserID() {
    return this._userID;
  }

  updateUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
    this._profileAvatar.src = data.avatar;
  }
}

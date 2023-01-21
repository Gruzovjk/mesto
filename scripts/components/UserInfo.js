export default class UserInfo {
  constructor({profileNameSelector, profileAboutSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
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
  }
}

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector(".popup__img");
    this._popupImgCaption = this._popup.querySelector(".popup__img-caption");
  }

  open(data) {
    this._popupImg.src = data.link;
    this._popupImg.alt = data.name;
    this._popupImgCaption.textContent = data.name;
    super.open();
  }
}

export default class Card {
  constructor(data, handleOpenPopupImg, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleOpenPopupImg = handleOpenPopupImg;
    this._templateSelector = templateSelector;
  }

  _getTemplateElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._title = cardElement.querySelector(".card__name");
    this._image = cardElement.querySelector(".card__img");
    this._likeButton = cardElement.querySelector(".card__like-button");
    this._removeButton = cardElement.querySelector(".card__remove-button");
    return cardElement;
  }

  _handleRemoveCard() {
    this._card.remove();
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _fillCardContent() {
    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
  }

  _setEventListeners() {
    this._removeButton.addEventListener("click", () => {
      this._handleRemoveCard();
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard();
    });
    this._image.addEventListener("click", () => {
      this._handleOpenPopupImg(this._name, this._link);
    });
  }

  generate() {
    this._card = this._getTemplateElement();
    this._fillCardContent();
    this._setEventListeners();
    return this._card;
  }
}

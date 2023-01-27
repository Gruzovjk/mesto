export default class Card {
  constructor(data, handleCardClick, templateSelector) {
    this._data = data;
    this._handleCardClick = handleCardClick;
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
    // this._likeCounter = cardElement.querySelector(".card__like-counter");
    return cardElement;
  }

  _handleRemoveCard() {
    this._card.remove();
    this._card = null;
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _fillCardContent() {
    this._title.textContent = this._data.name;
    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    // this._likeCounter.textContent = "245";
  }

  _setEventListeners() {
    this._removeButton.addEventListener("click", () => {
      this._handleRemoveCard();
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard();
    });
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });
  }

  generate() {
    this._card = this._getTemplateElement();
    this._fillCardContent();
    this._setEventListeners();
    return this._card;
  }
}

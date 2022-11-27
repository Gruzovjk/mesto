// импорт пока что из index.js
// импортируем нужные нам константы
import {
  popupImg,
  popupImgCaption,
  popupImgCard,
  openPopup,
} from "../../pages/index.js"; // изменить на "../utils/constants.js"

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplateElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _handleRemoveCard() {
    this._card.remove();
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleOpenPopupImg() {
    popupImg.src = this._image.src;
    popupImg.alt = this._image.alt;
    popupImgCaption.textContent = this._image.alt;
    openPopup(popupImgCard);
  }

  _getContent() {
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
      this._handleOpenPopupImg();
    });
  }

  // генерация карточки
  generate() {
    //* получаем cardElement
    this._card = this._getTemplateElement();
    //* связываемся с DOM
    this._title = this._card.querySelector(".card__name");
    this._image = this._card.querySelector(".card__img");
    this._likeButton = this._card.querySelector(".card__like-button");
    this._removeButton = this._card.querySelector(".card__remove-button");
    //* заполняем карточку
    this._getContent();
    //* вешаем слушатели
    this._setEventListeners();
    //* возвращаем готовую карточку
    return this._card;
  }
}

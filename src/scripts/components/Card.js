export default class Card {
  constructor({
    data,
    handleCardClick,
    templateSelector,
    userId,
    handleRemoveButton,
    handleLikeButton,
  }) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._handleRemoveButton = handleRemoveButton;
    this._handleLikeButton = handleLikeButton;
  }
  // получаем элемент
  _getTemplateElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._title = cardElement.querySelector(".card__name");
    this._image = cardElement.querySelector(".card__img");
    this._likeButton = cardElement.querySelector(".card__like-button");
    this._likeCounter = cardElement.querySelector(".card__like-counter");
    this._removeButton = cardElement.querySelector(".card__remove-button");
    return cardElement;
  }
  // удаление карточки
  removeCard() {
    this._card.remove();
    this._card = null;
  }
  // лайки
  addLike() {
    this._likeButton.classList.add("card__like-button_active");
    this.isLiked = true;
  }
  removeLike() {
    this._likeButton.classList.remove("card__like-button_active");
    this.isLiked = false;
  }
  // проверяем наличие своего лайка
  _checkUserLikes() {
    return this._data.likes.some((item) => item._id === this._userId);
  }
  // если на сервере есть мой лайк - красим кнопку, если нет - стираем
  _toggleLikesCounter() {
    if (this._checkUserLikes()) {
      this.addLike();
    } else {
      this.removeLike();
    }
  }
  // счетчик
  updateLikeCounter(data) {
    this._likeCounter.textContent = data.length;
  }
  // заполняем карточку
  _fillCardContent() {
    this._title.textContent = this._data.name;
    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    this._likeCounter.textContent = this._data.likes.length;
    if (this._userId !== this._ownerId) {
      this._removeButton.remove();
    }
  }
  // слушатели
  _setEventListeners() {
    this._removeButton.addEventListener("click", () => {
      this._handleRemoveButton(this);
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton(this);
    });
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });
  }

  id() {
    return this._data._id;
  }

  generate() {
    this._card = this._getTemplateElement();
    this._fillCardContent();
    this._toggleLikesCounter();
    this._setEventListeners();
    return this._card;
  }
}

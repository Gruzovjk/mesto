// попапы
const popupEditProfile = document.querySelector(".popup_type_profile");
const popupAddCard = document.querySelector(".popup_type_card-add");
const popupZoomImg = document.querySelector(".popup_type_img");

// формы попап
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const formAddCard = popupAddCard.querySelector(".popup__form");
// инпуты
const inputProfileName = popupEditProfile.querySelector(".popup__profile-name");
const inputProfileAbout = popupEditProfile.querySelector(
  ".popup__profile-about"
);
const inputCardName = popupAddCard.querySelector(".popup__card-name");
const inputCardLink = popupAddCard.querySelector(".popup__card-link");

// кнопки открытия попапов
const btnOpenEditProfile = document.querySelector(".profile__edit-button");
const btnOpenAddCard = document.querySelector(".profile__add-button");

// pop-up's buttons
const btnCloseEditProfile = popupEditProfile.querySelector(
  ".popup__close-button"
);
const btnCloseAddCard = popupAddCard.querySelector(".popup__close-button");
//profile
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
//zoom

// CARDS
const cardContainer = document.querySelector(".elements__list");
const cardTemplate = document
  .querySelector(".card__template")
  .content.querySelector(".card");

// открыть попап
const openPopup = (element) => {
  element.classList.toggle("popup_opened");
};

// закрыть попап
const closePopup = (element) => {
  element.classList.toggle("popup_opened");
};

const removeCard = (evt) => {
  const target = evt.target;
  const currentListItemEl = target.closest(".card");
  currentListItemEl.remove();
};
const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_active");
};

const renderCard = (element) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__remove-button");
  deleteButton.addEventListener("click", removeCard);
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);
  cardElement.querySelector(".card__name").textContent = element.name;
  cardElement.querySelector(".card__img").src = element.link;
  cardElement.querySelector(".card__img").alt = element.name;
  cardContainer.prepend(cardElement);
};

initialCards.forEach(renderCard);

// Handlers
const handleFormEditProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closePopup(popupEditProfile);
};
const handleFormAddCard = (evt) => {
  evt.preventDefault();
  const el = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  renderCard(el);
  closePopup(popupAddCard);
};

// Listeners
// _forms
formEditProfile.addEventListener("submit", handleFormEditProfile);
formAddCard.addEventListener("submit", handleFormAddCard);
// _buttons
btnOpenEditProfile.addEventListener("click", () => {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
  openPopup(popupEditProfile);
});
btnOpenAddCard.addEventListener("click", () => {
  inputCardName.value = "";
  inputCardLink.value = "";
  openPopup(popupAddCard);
});
btnCloseEditProfile.addEventListener("click", () => {
  closePopup(popupEditProfile);
});
btnCloseAddCard.addEventListener("click", () => {
  closePopup(popupAddCard);
});

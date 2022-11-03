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

// удаление карточки
const removeCard = (evt) => {
  const target = evt.target;
  const currentListItemEl = target.closest(".card");
  currentListItemEl.remove();
};

// лайк карточки
const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_active");
};

// // слушатели удаления, лайка и открытия зум попапа
// const setEventListener = (el) => {
//   const deleteButton = el.querySelector(".card__remove-button");
//   deleteButton.addEventListener("click", removeCard);
//   const likeButton = el.querySelector(".card__like-button");
//   likeButton.addEventListener("click", likeCard);
// };

const renderCard = (element) => {
  //клонируем контент карточки
  const cardElement = cardTemplate.cloneNode(true);
  // вешаем слушатели на кнопки
  const deleteButton = cardElement.querySelector(".card__remove-button");
  deleteButton.addEventListener("click", removeCard);
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);
  //отрисовка карточек из массива
  cardElement.querySelector(".card__name").textContent = element.name;
  cardElement.querySelector(".card__img").src = element.link;
  cardElement.querySelector(".card__img").alt = element.name;
  cardContainer.prepend(cardElement);
};

// render
// const getCardItemElement = (element) => {
//   const cardElement = cardTemplate.cloneNode(true);
//   cardElement.querySelector(".card__name").textContent = element.name;
//   cardElement.querySelector(".card__img").src = element.link;
//   cardElement.querySelector(".card__img").alt = element.name;
//   return cardElement;
// };

// const renderCard = (element) => {
//   const el = (element) => {};
//   setEventListener(el);
//   cardContainer.append(el);
// };

initialCards.forEach(renderCard);

// add new card
// const getNewCardItemElement = () => {
//   const el = cardTemplate.content.cloneNode(true).children[0];
//   el.querySelector(".card__name").textContent = inputCardName.value;
//   el.querySelector(".card__img").src = inputCardLink.value;
//   el.querySelector(".card__img").alt = inputCardName.value;
//   return el;
// };

// const addNewCard = (element) => {
//   const el = getNewCardItemElement(element);
//   setEventListener(el);
//   cardContainer.prepend(el);
// };

// popup's ФУНКЦИИ
// открыть попап
const openEditProfile = function () {
  popupEditProfile.classList.toggle("popup_opened");
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
};
const openAddCard = () => {
  inputCardName.value = "";
  inputCardLink.value = "";
  popupAddCard.classList.toggle("popup_opened");
};

// закрыть попап
const closeEditProfile = () => {
  popupEditProfile.classList.toggle("popup_opened");
};
const closeAddCard = () => {
  popupAddCard.classList.toggle("popup_opened");
};

//-------------------------

// ОБРАБОТЧИКИ
// обработчики отправки форм
const handleFormEditProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closeEditProfile();
};
const handleFormAddCard = (evt) => {
  evt.preventDefault();
  const element = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  renderCard(element);
  closeAddCard();
};

// СЛУШАТЕЛИ
// слушатели сохранения формы
formEditProfile.addEventListener("submit", handleFormEditProfile);
formAddCard.addEventListener("submit", handleFormAddCard);

// слушатели кнопок
btnOpenEditProfile.addEventListener("click", openEditProfile);
btnCloseEditProfile.addEventListener("click", closeEditProfile);
btnOpenAddCard.addEventListener("click", openAddCard);
btnCloseAddCard.addEventListener("click", closeAddCard);

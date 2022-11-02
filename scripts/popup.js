// попапы
const popupEditProfile = document.querySelector("#editProfile");
const popupAddCard = document.querySelector("#addCard");
const popupZoomImg = document.querySelector("#zoomImg");

// формы попап
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const formAddCard = popupAddCard.querySelector(".popup__form");
// инпуты
const inputProfileName = popupEditProfile.querySelector("#popup__profile-name");
const inputProfileAbout = popupEditProfile.querySelector(
  "#popup__profile-about"
);
const inputCardName = popupAddCard.querySelector("#popup__card-name");
const inputCardLink = popupAddCard.querySelector("#popup__card-link");

// кнопки открытия попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// pop-up's buttons
const closeEditProfileButton = popupEditProfile.querySelector(
  ".popup__close-button"
);
const closeAddCardButton = popupAddCard.querySelector(".popup__close-button");
//profile
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
//zoom

const zoomTemplate = document.querySelector("#zoomTemplate");

// CARDS
const cardsContainer = document.querySelector(".elements__list");
const cardTemplate = document.querySelector("#cardTemplate");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// удаление карточки
const removeCard = (evt) => {
  const target = evt.target;
  //боремся со всплытием, останавливаемся на ближайшем тэге card
  const currentListItemEl = target.closest(".card");
  currentListItemEl.remove();
};

// лайк карточки
const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_active");
};

// открытие зума
const openZoomImg = (evt) => {
  const el = zoomTemplate.content.cloneNode(true);
  el.querySelector(".popup__img").src = evt.target.src;
  el.querySelector(".popup__img-caption").textContent = evt.target.alt;
  setEventListenerForPopupZoomImg(el);
  popupZoomImg.prepend(el);
  popupZoomImg.classList.toggle("popup_opened");
};

//закрытие зума
const closeZoomImg = (evt) => {
  const target = evt.target;
  const currentListItemEl = target.closest(".popup__container");
  currentListItemEl.replaceChildren();
  popupZoomImg.classList.toggle("popup_opened");
};

const setEventListenerForPopupZoomImg = (el) => {
  const closeButton = el.querySelector(".popup__close-button");
  closeButton.addEventListener("click", closeZoomImg);
};

// слушатели удаления, лайка и открытия зум попапа
const setEventListener = (el) => {
  const deleteButton = el.querySelector(".card__remove-button");
  deleteButton.addEventListener("click", removeCard);
  const likeButton = el.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);
  const zoomButton = el.querySelector(".card__img");
  zoomButton.addEventListener("click", openZoomImg);
};

// render
const getCardItemElement = (element) => {
  const el = cardTemplate.content.cloneNode(true).children[0]; // children по совету из лайвкодинга
  el.querySelector(".card__name").textContent = element.name;
  el.querySelector(".card__img").src = element.link;
  el.querySelector(".card__img").alt = element.name;
  return el;
};

const renderCard = (element) => {
  const el = getCardItemElement(element);
  setEventListener(el);
  cardsContainer.append(el);
};

initialCards.forEach(renderCard);

// add new card
const getNewCardItemElement = () => {
  const el = cardTemplate.content.cloneNode(true).children[0];
  el.querySelector(".card__name").textContent = inputCardName.value;
  el.querySelector(".card__img").src = inputCardLink.value;
  el.querySelector(".card__img").alt = inputCardName.value;
  return el;
};

const addNewCard = (element) => {
  const el = getNewCardItemElement(element);
  setEventListener(el);
  cardsContainer.prepend(el);
};

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
  addNewCard();
  closeAddCard();
};

// СЛУШАТЕЛИ
// слушатели сохранения формы
formEditProfile.addEventListener("submit", handleFormEditProfile);
formAddCard.addEventListener("submit", handleFormAddCard);

// слушатели кнопок
profileEditButton.addEventListener("click", openEditProfile);
closeEditProfileButton.addEventListener("click", closeEditProfile);
addCardButton.addEventListener("click", openAddCard);
closeAddCardButton.addEventListener("click", closeAddCard);

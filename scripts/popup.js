// попапы
const editProfile = document.querySelector("#editProfile");
const addCard = document.querySelector("#addCard");
const zoomImg = document.querySelector("#zoomImg");

// формы попап
const formEditProfile = editProfile.querySelector(".popup__form");
const formAddCard = addCard.querySelector(".popup__form");
// инпуты
const inputProfileName = editProfile.querySelector("#popup__profile-name");
const inputProfileAbout = editProfile.querySelector("#popup__profile-about");
const inputCardName = addCard.querySelector("#popup__card-name");
const inputCardLink = addCard.querySelector("#popup__card-link");

// кнопки открытия попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// pop-up's buttons
const closeEditProfileButton = editProfile.querySelector(
  ".popup__close-button"
);
const closeAddCardButton = addCard.querySelector(".popup__close-button");
const closeZoomImgButton = zoomImg.querySelector(".popup__close-button");
//profile
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

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

// вешаем слушатели удаления и лайка
const setEventListener = (el) => {
  const deleteButton = el.querySelector(".card__remove-button");
  deleteButton.addEventListener("click", removeCard);
  const likeButton = el.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);
};

// Получаем элементы cardTempate
const getCardItemElement = (element) => {
  const el = cardTemplate.content.cloneNode(true).children[0]; // children по совету из лайвкодинга
  el.querySelector(".card__name").textContent = element.name;
  el.querySelector(".card__img").src = element.link;
  return el;
};
// функия отрисовки card
const renderCard = (element) => {
  const el = getCardItemElement(element);
  setEventListener(el);
  cardsContainer.append(el);
};

initialCards.forEach(renderCard);

// добавление нового места
const getNewCardItemElement = () => {
  const el = cardTemplate.content.cloneNode(true).children[0];
  el.querySelector(".card__name").textContent = inputCardName.value;
  el.querySelector(".card__img").src = inputCardLink.value;
  return el;
};

const addNewCard = (element) => {
  const el = getNewCardItemElement(element);
  setEventListener(el);
  cardsContainer.prepend(el);
};

// удаление карточки

// лайк карточки

// popup's ФУНКЦИИ
// открыть попап
const openEditProfile = function () {
  editProfile.classList.toggle("popup_opened");
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
};
const openAddCard = () => {
  inputCardName.value = "";
  inputCardLink.value = "";
  addCard.classList.toggle("popup_opened");
};
const openZoomImg = () => {
  zoomImg.classList.toggle("popup_opened");
};
// закрыть попап
const closeEditProfile = () => {
  editProfile.classList.toggle("popup_opened");
};
const closeAddCard = () => {
  addCard.classList.toggle("popup_opened");
};
const closeZoomImg = () => {
  zoomImg.classList.toggle("popup_opened");
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
closeZoomImgButton.addEventListener("click", closeZoomImg);

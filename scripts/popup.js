// попапы
const editProfile = document.querySelector("#editProfile");
const addCard = document.querySelector("#addCard");

// ЭЛЕМЕНТЫ СТРАНИЦЫ
//profile
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
// cards
const card = document.querySelector(".card");
const cardLikeButton = card.querySelector(".card__like-button");

// кнопки открытия попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// pop-up's buttons
const closeEditProfileButton = editProfile.querySelector(
  ".popup__close-button"
);
const closeAddCardButton = addCard.querySelector(".popup__close-button");

// ФУНКЦИИ------------------
// открыть попап
function openEditProfile() {
  editProfile.classList.toggle("popup_opened");
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
}
// закрыть попап
function closeEditProfile() {
  editProfile.classList.toggle("popup_opened");
}

function openAddCard() {
  addCard.classList.toggle("popup_opened");
}

function closeAddCard() {
  addCard.classList.toggle("popup_opened");
}

//-------------------------
// формы попап
const formEditProfile = editProfile.querySelector(".popup__form");
const formAddCard = addCard.querySelector(".popup__form");
// инпуты
const inputProfileName = editProfile.querySelector("#popup__profile-name");
const inputProfileAbout = editProfile.querySelector("#popup__profile-about");
const inputCardName = addCard.querySelector("#popup__card-name");
const inputCardSrc = addCard.querySelector("#popup__card-src");

// ОБРАБОТЧИКИ
// обработчики отправки формы
function handleFormEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closeEditProfile();
}

function handleFormAddCard(evt) {
  evt.preventDefault();
  closeAddCard();
}

// СЛУШАТЕЛИ
// слушатели сохранения формы
formEditProfile.addEventListener("submit", handleFormEditProfile);
formAddCard.addEventListener("submit", handleFormAddCard);

// слушатели кнопок
profileEditButton.addEventListener("click", openEditProfile);
closeEditProfileButton.addEventListener("click", closeEditProfile);
addCardButton.addEventListener("click", openAddCard);
closeAddCardButton.addEventListener("click", closeAddCard);

// попапы
const editProfile = document.querySelector("#editProfile");
const addCard = document.querySelector("#addCard");

// ЭЛЕМЕНТЫ СТРАНИЦЫ
//имя профиля && описание профиля
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
// кнопки открытия попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// pop-up's buttons
const closePopupEditProfileButton = editProfile.querySelector(
  ".popup__close-button"
);
const closePopupAddCardButton = addCard.querySelector(".popup__close-button");

// ФУНКЦИИ------------------
// открыть попап
function openPopupEditProfile() {
  editProfile.classList.toggle("popup_opened");
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
}
// закрыть попап
function closePopupEditProfile() {
  editProfile.classList.toggle("popup_opened");
}

function showPopupAddCard() {
  addCard.classList.toggle("popup_opened");
}

//-------------------------
// формы попап
const formEditProfile = editProfile.querySelector(".popup__form");

// инпуты
const inputProfileName = editProfile.querySelector("#popup__profile-name");
const inputProfileAbout = editProfile.querySelector("#popup__profile-about");

// ОБРАБОТЧИКИ
// обработчики отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closePopupEditProfile();
}

// СЛУШАТЕЛИ
// слушатели сохранения формы
formEditProfile.addEventListener("submit", formSubmitHandler);

// слушатели кнопок
profileEditButton.addEventListener("click", openPopupEditProfile);
closePopupEditProfileButton.addEventListener("click", closePopupEditProfile);
addCardButton.addEventListener("click", showPopupAddCard);
closePopupAddCardButton.addEventListener("click", showPopupAddCard);

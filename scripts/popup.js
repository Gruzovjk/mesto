// попапы
const editProfile = document.querySelector("#editProfile");

// ЭЛЕМЕНТЫ СТРАНИЦЫ
//имя профиля && описание профиля
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
// кнопки открытия попапов
const profileEditButton = document.querySelector(".profile__edit-button");

// pop-up's buttons
const closePopupButton = editProfile.querySelector(".popup__close-button");
const savePopupButton = editProfile.querySelector(".popup__save-button");

// ФУНКЦИИ
// открыть попап
function showPopupEditProfile() {
  editProfile.classList.toggle("popup_opened");
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
}

// закрыть попап
function closePopupEditProfile() {
  editProfile.classList.toggle("popup_opened");
}

// формы попап
const formEditProfile = editProfile.querySelector(".popup__form");

// инпуты
const inputProfileName = editProfile.querySelector("#popup__input-name");
const inputProfileAbout = editProfile.querySelector("#popup__input-about");

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
profileEditButton.addEventListener("click", showPopupEditProfile);
closePopupButton.addEventListener("click", closePopupEditProfile);

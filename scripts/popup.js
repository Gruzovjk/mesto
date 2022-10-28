// кнопка редкатирования профиля на странице
const profileEditButton = document.querySelector(".profile__edit-button");
// общий класс всех попапов
const popup = document.querySelectorAll(".popup");
// попап редактирования профиля
const editProfile = document.querySelector("#editProfile");
// кнопки закрытия и сейва. пока сделал для общего класса попапов
const closePopupButton = document.querySelector(".popup__close-button");
const savePopupButton = document.querySelector(".popup__save-button");
// открыть попап редактирования профиля
function showPopup() {
  editProfile.classList.toggle("popup_opened");
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}
// закрыть попап редактирования профиля
function closePopup() {
  editProfile.classList.toggle("popup_opened");
}
// имя профиля && описание профиля
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
// форма попапа
const formElement = document.querySelector(".popup__form");
// инпуты
const inputName = document.querySelector("#popup__input-name");
const inputAbout = document.querySelector("#popup__input-about");
// обработчик отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
}
// слушатель сохранения формы
formElement.addEventListener("submit", formSubmitHandler);
// слушатели кнопок открытия/закрытия попапа редактирования профиля
profileEditButton.addEventListener("click", showPopup);
closePopupButton.addEventListener("click", closePopup);

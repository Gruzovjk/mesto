// кнопка редкатирования профиля на странице
let profileEditButton = document.querySelector(".profile__edit-button");
// общий класс всех попапов
let popup = document.querySelectorAll(".popup");
// попап редактирования профиля
let editProfile = document.querySelector("#editProfile");
// кнопки закрытия и сейва. пока сделал для общего класса попапов
let closeButton = document.querySelector(".popup__close-button");
let saveButton = document.querySelector(".popup__save-button");

// функция для открытия/закрытия попапа редактирования профиля
function showPopup() {
  editProfile.classList.toggle("popup_opened");
}
// слушатели кнопок открытия/закрытия попапа редактирования профиля
profileEditButton.addEventListener("click", showPopup);
closeButton.addEventListener("click", showPopup);

// имя профиля && описание профиля
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
// форма попапа
let formElement = document.querySelector(".popup__container");
// инпуты
let inputName = document.querySelector("#popup__input-name");
let inputAbout = document.querySelector("#popup__input-about");
// обработчик отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  showPopup();
}
// слушатель сохранения формы
formElement.addEventListener("submit", formSubmitHandler);

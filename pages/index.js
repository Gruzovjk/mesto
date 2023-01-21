import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {initialCards, validationSettings} from "../scripts/utils/constants.js";
import {
  popups,
  profileName,
  profileAbout,
  popupEditProfile,
  popupAddCard,
  popupImgCard,
  btnOpenEditProfile,
  btnOpenAddCard,
  cardContainer,
  popupImg,
  popupImgCaption,
  formEditProfile,
  formAddCard,
  inputProfileName,
  inputProfileAbout,
  inputCardName,
  inputCardLink,
  btnSubmitAddCard,
} from "../scripts/utils/elements.js";

// userInfo
const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
});

// создание попапа изображения + слушатели
const popupWithImage = new PopupWithImage(".popup_type_img");
const handleCardClick = (data) => {
  popupWithImage.open(data);
};
popupWithImage.setEventListeners();

// функция создание карточки
const createCard = (data) => {
  const card = new Card(data, handleCardClick, ".card__template");
  const cardElement = card.generate();
  return cardElement;
};

// создание section + отрисовка стартовых карточек
const cardSection = new Section(
  {
    renderer: (data) => {
      createCard(data);
      cardSection.addItem(createCard(data));
    },
  },
  cardContainer
);
cardSection.renderItems(initialCards);

// создание попапа профиля + слушатели
const popupTypeProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});
popupTypeProfile.setEventListeners();

// добавление карточки

const handleFormAddCard = (evt) => {
  evt.preventDefault();
  const data = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  cardSection.addItem(createCard(data));
  closePopup(popupAddCard);
  formAddCard.reset();
};

/*
const formEditProfileValidator = new FormValidator(validationSettings, formEditProfile);
const formAddCardValidator = new FormValidator(validationSettings, formAddCard);

formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
*/
// вкл. валидации всех форм
const enableValidation = () => {
  const forms = Array.from(document.forms);
  forms.forEach((form) => {
    const formValidator = new FormValidator(validationSettings, form);
    formValidator.enableValidation();
  });
};
enableValidation();

///////////

// listeners

btnOpenEditProfile.addEventListener("click", function () {
  const values = userInfo.getUserInfo();
  inputProfileName.value = values.name;
  inputProfileAbout.value = values.about;
  popupTypeProfile.open();
});

// formEditProfile.addEventListener("submit", handleFormEditProfile);
formAddCard.addEventListener("submit", handleFormAddCard);
// btnOpenEditProfile.addEventListener("click", () => {
//   inputProfileName.value = profileName.textContent;
//   inputProfileAbout.value = profileAbout.textContent;
//   openPopup(popupEditProfile);
// });
btnOpenAddCard.addEventListener("click", () => {
  // formAddCardValidator.toggleButtonState();
  btnSubmitAddCard.disabled = true;
  openPopup(popupAddCard);
});

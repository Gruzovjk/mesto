const popups = Array.from(document.querySelectorAll(".popup"));
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const popupEditProfile = document.querySelector(".popup_type_profile");
const popupAddCard = document.querySelector(".popup_type_card-add");
const popupImgCard = document.querySelector(".popup_type_img");
const btnOpenEditProfile = document.querySelector(".profile__edit-button");
const btnOpenAddCard = document.querySelector(".profile__add-button");
const cardContainer = document.querySelector(".elements__list");
const popupImg = popupImgCard.querySelector(".popup__img");
const popupImgCaption = popupImgCard.querySelector(".popup__img-caption");
const formEditProfile = document.forms.profile;
const formAddCard = document.forms.card;
const inputProfileName = formEditProfile.elements.name;
const inputProfileAbout = formEditProfile.elements.about;
const inputCardName = formAddCard.elements.name;
const inputCardLink = formAddCard.elements.src;
const btnSubmitAddCard = popupAddCard.querySelector(".popup__save-button");
const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inputErrorClass: "popup__input_type_error",
};

export {
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
  settings,
};

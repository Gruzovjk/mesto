const btnOpenEditProfile = document.querySelector(".profile__edit-button");
const btnOpenAddCard = document.querySelector(".profile__add-button");
const cardContainer = document.querySelector(".elements__list");
const formEditProfile = document.forms.profile;
const formAddCard = document.forms.card;
const popupAddCard = document.querySelector(".popup_type_card-add");
const inputProfileName = formEditProfile.elements.name;
const inputProfileAbout = formEditProfile.elements.about;
const inputCardName = formAddCard.elements.name;
const inputCardLink = formAddCard.elements.src;
const btnSubmitAddCard = popupAddCard.querySelector(".popup__save-button");

export {
  btnOpenEditProfile,
  btnOpenAddCard,
  cardContainer,
  formEditProfile,
  inputProfileName,
  inputProfileAbout,
  inputCardName,
  inputCardLink,
  btnSubmitAddCard,
};

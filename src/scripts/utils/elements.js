const btnOpenEditProfile = document.querySelector(".profile__edit-button");
const btnOpenAddCard = document.querySelector(".profile__add-button");
const cardContainer = document.querySelector(".elements__list");
const formEditProfile = document.forms.profile;
const formAddCard = document.forms.card;
const inputProfileName = formEditProfile.elements.name;
const inputProfileAbout = formEditProfile.elements.about;
const inputCardName = formAddCard.elements.name;
const inputCardLink = formAddCard.elements.src;

export {
  btnOpenEditProfile,
  btnOpenAddCard,
  cardContainer,
  formEditProfile,
  inputProfileName,
  inputProfileAbout,
  inputCardName,
  inputCardLink,
  formAddCard,
};

const btnOpenEditProfile = document.querySelector(".profile__edit-button");
const btnOpenAddCard = document.querySelector(".profile__add-button");
const cardContainer = document.querySelector(".elements__list");
const formEditProfile = document.forms.profile;
const formAddCard = document.forms.card;
const inputProfileName = formEditProfile.elements.name;
const inputProfileAbout = formEditProfile.elements.about;
const formUpdateAvatar = document.forms.avatar;
const btnUpdateAvatar = document.querySelector(".profile__avatar-edit-button");
const avatarImg = document.querySelector(".profile__avatar-img");
const inputUpdateAvatar = formUpdateAvatar.elements.src;

export {
  btnOpenEditProfile,
  btnOpenAddCard,
  cardContainer,
  formEditProfile,
  inputProfileName,
  inputProfileAbout,
  formAddCard,
  formUpdateAvatar,
  btnUpdateAvatar,
  avatarImg,
  inputUpdateAvatar,
};

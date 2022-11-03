// DOM-elements
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const popupEditProfile = document.querySelector(".popup_type_profile");
const popupAddCard = document.querySelector(".popup_type_card-add");
const popupImg = document.querySelector(".popup_type_img");
const btnOpenEditProfile = document.querySelector(".profile__edit-button");
const btnOpenAddCard = document.querySelector(".profile__add-button");
const cardContainer = document.querySelector(".elements__list");
const cardTemplate = document
  .querySelector(".card__template")
  .content.querySelector(".card");
// popup's elements
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const formAddCard = popupAddCard.querySelector(".popup__form");
const inputProfileName = popupEditProfile.querySelector(".popup__profile-name");
const inputProfileAbout = popupEditProfile.querySelector(
  ".popup__profile-about"
);
const inputCardName = popupAddCard.querySelector(".popup__card-name");
const inputCardLink = popupAddCard.querySelector(".popup__card-link");
const btnCloseEditProfile = popupEditProfile.querySelector(
  ".popup__close-button"
);
const btnCloseAddCard = popupAddCard.querySelector(".popup__close-button");
const btnCloseImg = popupImg.querySelector(".popup__close-button");
//fncs
const openPopup = (element) => {
  element.classList.toggle("popup_opened");
};
const closePopup = (element) => {
  element.classList.toggle("popup_opened");
};
const renderCard = (element) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__remove-button");
  deleteButton.addEventListener("click", (evt) => {
    const target = evt.target;
    const currentListItemEl = target.closest(".card");
    currentListItemEl.remove();
  });
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_active");
  });
  const imgOpen = cardElement.querySelector(".card__img");
  imgOpen.addEventListener("click", () => {
    popupImg.querySelector(".popup__img").src = imgOpen.src;
    popupImg.querySelector(".popup__img").alt = imgOpen.alt;
    popupImg.querySelector(".popup__img-caption").textContent = imgOpen.alt;
    openPopup(popupImg);
  });
  cardElement.querySelector(".card__name").textContent = element.name;
  cardElement.querySelector(".card__img").src = element.link;
  cardElement.querySelector(".card__img").alt = element.name;
  cardContainer.prepend(cardElement);
};
initialCards.forEach(renderCard);
// handlers
const handleFormEditProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closePopup(popupEditProfile);
};
const handleFormAddCard = (evt) => {
  evt.preventDefault();
  const el = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  renderCard(el);
  closePopup(popupAddCard);
};
// listeners
formEditProfile.addEventListener("submit", handleFormEditProfile);
formAddCard.addEventListener("submit", handleFormAddCard);
btnOpenEditProfile.addEventListener("click", () => {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
  openPopup(popupEditProfile);
});
btnOpenAddCard.addEventListener("click", () => {
  inputCardName.value = "";
  inputCardLink.value = "";
  openPopup(popupAddCard);
});
btnCloseEditProfile.addEventListener("click", () => {
  closePopup(popupEditProfile);
});
btnCloseAddCard.addEventListener("click", () => {
  closePopup(popupAddCard);
});
btnCloseImg.addEventListener("click", () => {
  closePopup(popupImg);
});

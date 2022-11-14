// DOM-elements
const popups = Array.from(document.querySelectorAll(".popup"));
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const popupEditProfile = document.querySelector(".popup_type_profile");
const popupAddCard = document.querySelector(".popup_type_card-add");
const popupImgCard = document.querySelector(".popup_type_img");
const btnOpenEditProfile = document.querySelector(".profile__edit-button");
const btnOpenAddCard = document.querySelector(".profile__add-button");
const cardContainer = document.querySelector(".elements__list");
const cardTemplate = document
  .querySelector(".card__template")
  .content.querySelector(".card");
// popup's elements
const popupImg = popupImgCard.querySelector(".popup__img");
const popupImgCaption = popupImgCard.querySelector(".popup__img-caption");
const formEditProfile = document.forms.profile;
const formAddCard = document.forms.card;
const inputProfileName = formEditProfile.elements.name;
const inputProfileAbout = formEditProfile.elements.about;
const inputCardName = formAddCard.elements.name;
const inputCardLink = formAddCard.elements.src;
const btnCloseEditProfile = popupEditProfile.querySelector(
  ".popup__close-button"
);
const btnCloseAddCard = popupAddCard.querySelector(".popup__close-button");
const btnCloseImg = popupImgCard.querySelector(".popup__close-button");
//fncs
const openPopup = (element) => {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
};
const closePopup = (element) => {
  element.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
};
const renderCard = (element) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardName = cardElement.querySelector(".card__name");
  const cardImg = cardElement.querySelector(".card__img");
  const deleteButton = cardElement.querySelector(".card__remove-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardName.textContent = element.name;
  cardImg.src = element.link;
  cardImg.alt = element.name;
  deleteButton.addEventListener("click", (evt) => {
    const target = evt.target;
    const currentListItemEl = target.closest(".card");
    currentListItemEl.remove();
  });
  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_active");
  });
  cardImg.addEventListener("click", () => {
    popupImg.src = cardImg.src;
    popupImg.alt = cardImg.alt;
    popupImgCaption.textContent = cardImg.alt;
    openPopup(popupImgCard);
  });
  return cardElement;
};
const addCard = (element) => {
  cardContainer.prepend(renderCard(element));
};
initialCards.forEach(addCard);

// handlers
const handleFormEditProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closePopup(popupEditProfile);
  formEditProfile.reset();
};
const handleFormAddCard = (evt) => {
  evt.preventDefault();
  const el = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  addCard(el);
  closePopup(popupAddCard);
  formAddCard.reset();
};
const closeByEsc = (evt) => {
  if (evt.key === "Escape" || evt.key === "Esc") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

// listeners
formEditProfile.addEventListener("submit", handleFormEditProfile);
formAddCard.addEventListener("submit", handleFormAddCard);
btnOpenEditProfile.addEventListener("click", () => {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
  openPopup(popupEditProfile);
  enableValidation();
});
btnOpenAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
  enableValidation();
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

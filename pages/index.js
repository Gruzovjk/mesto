import Card from "../scripts/components/card.js";
import {initialCards} from "../scripts/utils/initialCards.js";
import {enableValidation} from "../scripts/components/validation.js";
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
} from "../scripts/utils/constants.js";

const openPopup = (element) => {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
};
const closePopup = (element) => {
  element.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
};

const addCard = (data) => {
  const card = new Card(data, ".card__template");
  const cardElement = card.generate();
  cardContainer.prepend(cardElement);
};

initialCards.forEach((item) => addCard(item));

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
  const data = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  addCard(data);
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
});
btnOpenAddCard.addEventListener("click", () => {
  btnSubmitAddCard.disabled = true;
  openPopup(popupAddCard);
});
//close by btn/overlay
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

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  fieldSelector: ".popup__set",
  submitButtonSelector: ".popup__save-button",
  inputErrorClass: "popup__input_type_error",
});

export {popupImg, popupImgCaption, popupImgCard, openPopup};

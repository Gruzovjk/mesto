import Card from "../scripts/components/card.js";
import FormValidator from "../scripts/components/formValidator.js";
import Section from "../scripts/components/section.js";
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

const openPopup = (element) => {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
};
const closePopup = (element) => {
  element.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
};

const handleOpenPopupImg = (name, link) => {
  popupImg.src = link;
  popupImg.alt = name;
  popupImgCaption.textContent = name;
  openPopup(popupImgCard);
};

const addCard = (data) => {
  const card = new Card(data, handleOpenPopupImg, ".card__template");
  const cardElement = card.generate();
  cardContainer.prepend(cardElement);
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
/*
const formEditProfileValidator = new FormValidator(validationSettings, formEditProfile);
const formAddCardValidator = new FormValidator(validationSettings, formAddCard);

formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
*/
const enableValidation = () => {
  const forms = Array.from(document.forms);
  forms.forEach((form) => {
    const formValidator = new FormValidator(validationSettings, form);
    formValidator.enableValidation();
  });
};
//
const cardsList = new Section(
  {
    data: messageList,
    renderer: () => {
      // Тело функции renderer пока оставим пустым
    },
  },
  cardListSection
);
///////////
// listeners
formEditProfile.addEventListener("submit", handleFormEditProfile);
formAddCard.addEventListener("submit", handleFormAddCard);
btnOpenEditProfile.addEventListener("click", () => {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
  openPopup(popupEditProfile);
});
btnOpenAddCard.addEventListener("click", () => {
  // formAddCardValidator.toggleButtonState();
  btnSubmitAddCard.disabled = true;
  openPopup(popupAddCard);
});
//close by btn/overlay
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(popup);
    }
  });
});

enableValidation();

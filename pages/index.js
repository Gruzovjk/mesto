import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import Popup from "../scripts/components/Popup.js";
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

// const openPopup = (element) => {
//   element.classList.add("popup_opened");
//   document.addEventListener("keydown", closeByEsc);
// };
// const closePopup = (element) => {
//   element.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeByEsc);
// };

const handleOpenPopupImg = (name, link) => {
  popupImg.src = link;
  popupImg.alt = name;
  popupImgCaption.textContent = name;
  openPopup(popupImgCard);
};
// создание карточки
const createCard = (data) => {
  const card = new Card(data, handleOpenPopupImg, ".card__template");
  const cardElement = card.generate();
  return cardElement;
};
// создание section
const cardSection = new Section(
  {
    renderer: (data) => {
      createCard(data);
      cardSection.addItem(createCard(data));
    },
  },
  cardContainer
);
// отрисовка стартовых карточек
cardSection.renderItems(initialCards);

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
  cardSection.addItem(createCard(data));
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
// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (evt) => {
//     if (
//       evt.target.classList.contains("popup_opened") ||
//       evt.target.classList.contains("popup__close-button")
//     ) {
//       closePopup(popup);
//     }
//   });
// });

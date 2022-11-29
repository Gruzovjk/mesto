import Card from "./components/card.js";
import FormValidator from "./components/formValidator.js";
import {initialCards, validationSettings} from "./utils/constants.js";
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
} from "./utils/elements.js";

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
1. Можете пожалуйста пояснить, для чего вызывать валидатор отдельно для каждой формы? 
В чем практический смысл? 

2. В таком варианте код становится менее универсальным. При добавлении любой новой формы - 
придется записывать новую константу и вызывать у неё enableValidation. А если форм будет 150?

3. Я думаю, что смысл валидации в данном приложении в том, чтобы проверять то, что вводит ПОЛЬЗОВАТЕЛЬ. 
Зачем нашей валидации проверять то, что МЫ написали? 
Если мы просто одной строчкой можем задать стиль кнопки по умолчанию. 
Обработчики кнопок у каждой формы все равно будут с отдельними приватными настройками 
в соответствующем экземпляре своего класса. 
(Что-то вроде:
   class PopupAddCard extends Popup {
   
   ... 

   _hanldeSubmitBtn() {
    super._hanldeSubmitBtn();
    "наши настройки..."
   }

   ...
   }
   p.s. может быть, я не правильно рассуждаю. 

4. Естественно, мне не составит труда раскомментировать и сделать toggleButtonState публичным, 
но прежде, мне хотелось бы понять - почему этот вариант лучше

const formEditProfileValidator = new FormValidator(
  validationSettings,
  formEditProfile
);
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

enableValidation();

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

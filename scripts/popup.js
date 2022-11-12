// DOM-elements
// const popup = Array.from(document.querySelectorAll(".popup"));
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
};
const closePopup = (element) => {
  element.classList.remove("popup_opened");
};
const renderCard = (element) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__remove-button");
  deleteButton.addEventListener("click", (evt) => {
    const target = evt.target;
    const currentListItemEl = target.closest(".card");
    currentListItemEl.remove();
  });
  // ? вопрос внизу, в слушателях
  // const likeButton = cardElement.querySelector(".card__like-button");
  // likeButton.addEventListener("click", (evt) => {
  //   evt.target.classList.toggle("card__like-button_active");
  // });
  const imgOpen = cardElement.querySelector(".card__img");
  imgOpen.addEventListener("click", () => {
    popupImgCard.querySelector(".popup__img").src = imgOpen.src;
    popupImgCard.querySelector(".popup__img").alt = imgOpen.alt;
    popupImgCard.querySelector(".popup__img-caption").textContent = imgOpen.alt;
    openPopup(popupImgCard);
  });
  cardElement.querySelector(".card__name").textContent = element.name;
  cardElement.querySelector(".card__img").src = element.link;
  cardElement.querySelector(".card__img").alt = element.name;
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

const handleClosingOnOverlay = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
};

const handleClosingOnEsc = (evt) => {
  if (evt.key === "Escape" || evt.key === "Esc") {
    closePopup(popupImgCard);
    closePopup(popupEditProfile);
    closePopup(popupAddCard);
  }
};
// ?
const handleLikeCard = (evt) => {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_active");
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
  openPopup(popupAddCard);
});
btnCloseEditProfile.addEventListener("click", () => {
  closePopup(popupEditProfile);
});
btnCloseAddCard.addEventListener("click", () => {
  closePopup(popupAddCard);
});
btnCloseImg.addEventListener("click", () => {
  closePopup(popupImgCard);
});

document.addEventListener("keydown", handleClosingOnEsc);
document.addEventListener("mousedown", handleClosingOnOverlay);
// ?
// корректно ли сделать кнопки карточки таким образом
// или лучше оставить отрисовку карточки целой?
document.addEventListener("click", handleLikeCard);

//
// document.addEventListener("keydown", (evt) => {
//   if (evt.key === "Escape" || evt.key === "Esc") {
//     closePopup(popupImgCard);
//     closePopup(popupEditProfile);
//     closePopup(popupAddCard);
//   }
// });

// document.addEventListener("click", (evt) => {
//   if (evt.target.classList.contains("popup")) {
//     closePopup(evt.target);
//   }
// });

// так тоже работает, но с ошибкой
// popup.forEach(
//   addEventListener("click", (evt) => {
//     if (evt.target.classList.contains("popup")) {
//       closePopup(evt.target);
//     }
//   })
// );

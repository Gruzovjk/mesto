import "./index.css";
import Api from "../scripts/components/Api";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm";
import {validationSettings} from "../scripts/utils/constants.js";
import {apiConfig} from "../scripts/utils/apiConfig";
import {
  btnOpenEditProfile,
  btnOpenAddCard,
  cardContainer,
  inputProfileName,
  inputProfileAbout,
  inputCardName,
  inputCardLink,
  formAddCard,
  formEditProfile,
  formUpdateAvatar,
  btnUpdateAvatar,
  avatarImg,
  inputUpdateAvatar,
} from "../scripts/utils/elements.js";

// подключаем Api (да помогут мне боги всех пантеонов)
const api = new Api(apiConfig);

// инициализация юзер инфо
const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
  profileAvatarSelector: ".profile__avatar-img",
});

// функция создание карточки
const createCard = (data) => {
  const card = new Card(data, handleCardClick, ".card__template");
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
// отрисовка карточек с сервера (работает)
api
  .getInitialCards()
  .then((res) => {
    cardSection.renderItems(res);
  })
  .catch((err) => {
    console.error(err);
  });
// отрисовка юзер инфо с сервера (вроде работает)
api
  .getProfileInfo()
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
      avatar: data.avatar,
      userID: data._id,
    });
  })
  .catch((err) => {
    console.error(err);
  });

// создание попапа изображения + слушатели
const popupWithImage = new PopupWithImage(".popup_type_img");
const handleCardClick = (data) => {
  popupWithImage.open(data);
};
popupWithImage.setEventListeners();

// создание попапа профиля + слушатели
const popupTypeProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});
popupTypeProfile.setEventListeners();

// добавление карточки + слушатели
const popupTypeCardAdd = new PopupWithForm({
  popupSelector: ".popup_type_card-add",
  handleFormSubmit: () => {
    const data = {
      name: inputCardName.value,
      link: inputCardLink.value,
    };
    cardSection.addItem(createCard(data));
  },
});
popupTypeCardAdd.setEventListeners();

// вкл. валидации всех форм
const formEditProfileValidator = new FormValidator(
  validationSettings,
  formEditProfile
);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(validationSettings, formAddCard);
formAddCardValidator.enableValidation();

const formUpdateAvatarValidator = new FormValidator(
  validationSettings,
  formUpdateAvatar
);
formUpdateAvatarValidator.enableValidation();

// открытие попапа редактирования профиля
btnOpenEditProfile.addEventListener("click", function () {
  const values = userInfo.getUserInfo();
  inputProfileName.value = values.name;
  inputProfileAbout.value = values.about;
  popupTypeProfile.open();
});

// открытие попапа добавления карточки
btnOpenAddCard.addEventListener("click", () => {
  popupTypeCardAdd.open();
  formAddCardValidator.toggleButtonState();
});
/////////////////////////// обновление аватара
const popupTypeUpdateAvatar = new PopupWithForm({
  popupSelector: ".popup_type_update-avatar",
  handleFormSubmit: () => {
    avatarImg.src = inputUpdateAvatar.value;
  },
});
popupTypeUpdateAvatar.setEventListeners();

btnUpdateAvatar.addEventListener("click", function () {
  popupTypeUpdateAvatar.open();
  formUpdateAvatarValidator.toggleButtonState();
});

/////////////////////////
const popupTypeConfirm = new PopupWithConfirm(".popup_type_confirm-remove");
popupTypeConfirm.setEventListeners();

const btnRemoveCard = document.querySelectorAll(".card__remove-button");

btnRemoveCard.forEach((element) => {
  element.addEventListener("click", function () {
    popupTypeConfirm.open();
  });
});

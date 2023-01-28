import "./index.css";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm";
import Api from "../scripts/components/Api";
import UserInfo from "../scripts/components/UserInfo.js";
import {apiConfig} from "../scripts/utils/apiConfig";
import {validationSettings} from "../scripts/utils/validationSettings.js";
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
} from "../scripts/utils/elements.js";

// userInfo
const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
  profileAvatarSelector: ".profile__avatar-img",
});
// подключил апи
const api = new Api(apiConfig);

// функция создание карточки
const createCard = (data) => {
  const card = new Card(data, handleCardClick, ".card__template");
  return card.generate();
};

// создание section + отрисовка стартовых карточек
const cardSection = new Section(
  {
    renderer: (data) => {
      createCard(data);
      cardSection.addItem(createCard(data));
    },
  },
  cardContainer
);

// отрисовка данных с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([userData, cardList]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    cardSection.renderItems(cardList);
  }
);
/// попапы

// добавление карточки
const popupTypeCardAdd = new PopupWithForm({
  popupSelector: ".popup_type_card-add",
  handleFormSubmit: () => {
    const data = {
      name: inputCardName.value,
      link: inputCardLink.value,
    };
    api
      .addCard(data)
      .then((res) => {
        cardSection.addItem(createCard(res));
      })
      .catch((err) => {
        console.log(`Не удалось загрузить, ${err}`);
      });
  },
});
popupTypeCardAdd.setEventListeners();

// попап изображения
const popupWithImage = new PopupWithImage(".popup_type_img");
popupWithImage.setEventListeners();

// попап апдейта аватара
const popupTypeUpdateAvatar = new PopupWithForm({
  popupSelector: ".popup_type_update-avatar",
  handleFormSubmit: (data) => {
    api.editUserAvatar(data).then((res) => {
      userInfo.setUserAvatar(res);
    });
  },
});
popupTypeUpdateAvatar.setEventListeners();

// попап редактирования профиля
const popupTypeProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: (data) => {
    api
      .editUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(`Поймали ошибку ${err}`);
      });
  },
});
popupTypeProfile.setEventListeners();

// попап подтверждения удаления
const popupTypeConfirm = new PopupWithConfirm(".popup_type_confirm-remove");
popupTypeConfirm.setEventListeners();

/// слушатели кнопок

// открытие попапа добавления карточки
btnOpenAddCard.addEventListener("click", () => {
  popupTypeCardAdd.open();
  formAddCardValidator.toggleButtonState();
});

// открытия попапа изображения
const handleCardClick = (data) => {
  popupWithImage.open(data);
};

// открытие попапа апдейта аватара
btnUpdateAvatar.addEventListener("click", function () {
  popupTypeUpdateAvatar.open();
  formUpdateAvatarValidator.toggleButtonState();
});

// открытие попапа редактирования профиля
btnOpenEditProfile.addEventListener("click", function () {
  const values = userInfo.getUserInfo();
  inputProfileName.value = values.name;
  inputProfileAbout.value = values.about;
  popupTypeProfile.open();
});

/// Валидация
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

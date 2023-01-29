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
// получаю свой айди
let userId;
// функция создание карточки
const createCard = (cardData) => {
  const card = new Card({
    data: cardData,
    handleCardClick: (data) => {
      popupWithImage.open(data);
    },
    templateSelector: ".card__template",
    userId: userId,
    handleRemoveButton: (card) => {
      popupTypeConfirm.open();
      popupTypeConfirm.setSubmitAction(() => {
        popupTypeConfirm.twister(true);
        api
          .removeCard(card.id())
          .then(() => {
            card.removeCard();
            popupTypeConfirm.close();
          })
          .catch((err) =>
            console.log(`При удалении фото произошла ошибка: ${err}`)
          )
          .finally(() => {
            popupTypeConfirm.twister(false);
          });
      });
    },
    handleLikeButton: () => {
      if (!card.isLiked) {
        api
          .addLike(card.id())
          .then((res) => {
            card.addLike();
            card.updateLikeCounter(res.likes);
          })
          .catch((err) =>
            console.log(`При добавлении лайка произошла ошибка: ${err}`)
          );
      } else {
        api
          .removeLike(card.id())
          .then((res) => {
            card.removeLike();
            card.updateLikeCounter(res.likes);
          })
          .catch((err) =>
            console.log(`При удалении  лайка произошла ошибка: ${err}`)
          );
      }
    },
  });
  return card.generate();
};

// создание section + отрисовка стартовых карточек
const cardSection = new Section(
  {
    renderer: (data) => {
      cardSection.addItemApp(createCard(data));
    },
  },
  cardContainer
);

// отрисовка данных с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([userData, cardList]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardSection.renderItems(cardList);
  }
);

/// попапы

// добавление карточки
const popupTypeCardAdd = new PopupWithForm({
  popupSelector: ".popup_type_card-add",
  handleFormSubmit: (data) => {
    popupTypeCardAdd.twister(true);
    api
      .addCard(data)
      .then((res) => {
        cardSection.addItemPrep(createCard(res));
        popupTypeCardAdd.close();
      })
      .catch((err) => {
        console.log(`При загрузке фото произошла ошибка: ${err}`);
      })
      .finally(() => {
        popupTypeCardAdd.twister(false);
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
    popupTypeUpdateAvatar.twister(true);
    api
      .editUserAvatar(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupTypeUpdateAvatar.close();
      })
      .catch((err) =>
        console.log(`При загрузке аватара произошла ошибка: ${err}`)
      )
      .finally(() => {
        popupTypeUpdateAvatar.twister(false);
      });
  },
});
popupTypeUpdateAvatar.setEventListeners();

// попап редактирования профиля
const popupTypeProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: (data) => {
    popupTypeProfile.twister(true);
    api
      .editUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupTypeProfile.close();
      })
      .catch((err) => {
        console.log(`При обновлении данных произошла ошибка: ${err}`);
      })
      .finally(() => {
        popupTypeProfile.twister(false);
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

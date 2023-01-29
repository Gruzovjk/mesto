import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup__save-button")) {
        console.log(
          "У меня нет идей, почему не работает сабмит. Никаких. Я 2 часа пытаюсь решить эту проблему. type кнопки в html = submit."
        );
        // evt.preventDefault();
        this._handleSubmit();
        super.close();
      }
    });
  }
}

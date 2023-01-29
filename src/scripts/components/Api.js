export default class Api {
  constructor(apiConfig) {
    this._url = apiConfig.url;
    this._headers = apiConfig.headers;
  }

  // метод проверки ответа с сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status}: ${res.statusText}`);
    }
  }
  // получаем карточки с сервера (дай Бог)
  async getInitialCards() {
    const res = await fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }
  // Добавление карточки на сервер (Зевс смилуется)
  async addCard(data) {
    const res = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    return this._checkResponse(res);
  }
  // удаление карточки с сервера по id (Будда услышит)
  async removeCard(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }
  // лайки (Афродита одобрит)
  async addLike(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }
  async removeLike(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  // получаем инфо профиля (Кришна со мной)
  async getUserInfo() {
    const res = await fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }
  // редкатирование инфо (Перун благословит)
  async editUserInfo(data) {
    const res = await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._checkResponse(res);
  }
  // редактирование аватара профиля (Один в помощь)
  async editUserAvatar(data) {
    const res = await fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    return this._checkResponse(res);
  }
}

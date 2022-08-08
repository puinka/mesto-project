export default class Api {
  constructor({ serverURL, headers }) {
    this._url = serverURL;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  updateProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleServerResponse);
  }

  updateAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._handleServerResponse);
  }

  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleServerResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  giveLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  takeLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }
}

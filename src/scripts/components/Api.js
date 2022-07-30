import {
  profileUserName,
  profileUserOccupation,
  inputAvatarLink,
  inputPlaceName,
  inputPlaceLink,
} from "../utils/constants.js";

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

  updateProfile() {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: profileUserName.value,
        about: profileUserOccupation.value,
      }),
    }).then(this._handleServerResponse);
  }

  updateAvatar() {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputAvatarLink.value,
      }),
    }).then(this._handleServerResponse);
  }

  addNewCard() {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: inputPlaceName.value,
        link: inputPlaceLink.value,
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

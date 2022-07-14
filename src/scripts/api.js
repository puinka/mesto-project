import { apiConfig } from "./config.js";

function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

function getCards() {
  return fetch(`${apiConfig.serverURL}/cards`, {
    method: "GET",
    headers: apiConfig.headers,
  }).then(handleServerResponse);
}

function getProfile() {
  return fetch(`${apiConfig.serverURL}/users/me`, {
    method: "GET",
    headers: apiConfig.headers,
  }).then(handleServerResponse);
}

function patchProfile(name, about) {
  return fetch(`${apiConfig.serverURL}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleServerResponse);
}

function patchAvatar(link) {
  return fetch(`${apiConfig.serverURL}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(handleServerResponse);
}

function postCard({ name, link }) {
  return fetch(`${apiConfig.serverURL}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleServerResponse);
}

function deleteCard(cardId) {
  return fetch(`${apiConfig.serverURL}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(handleServerResponse);
}

export {
  getCards,
  getProfile,
  patchProfile,
  patchAvatar,
  postCard,
  deleteCard,
};

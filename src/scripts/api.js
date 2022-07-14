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

export { getCards, getProfile };

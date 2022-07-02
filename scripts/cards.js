import { handleImageView } from "./popup.js";

export function generateCardElement({ name, link }) {
  const cardTemplate = document.querySelector(`#card-template`).content;
  const cardElement = cardTemplate.querySelector(`.element`).cloneNode(true);
  const deleteButton = cardElement.querySelector(`.element__delete-button`);
  const likeButton = cardElement.querySelector(`.element__like-button`);
  const cardPhoto = cardElement.querySelector(`.element__image`);

  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardElement.querySelector(`.element__title`).textContent = name;

  deleteButton.addEventListener(`click`, function () {
    deleteButton.closest(`.element`).remove();
  });

  likeButton.addEventListener(`click`, function (evt) {
    evt.target.classList.toggle(`element__like-button-active`);
  });

  cardPhoto.addEventListener(`click`, () => handleImageView(name, link));

  return cardElement;
}

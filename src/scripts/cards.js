import { card } from "./data.js";
import { openPopup } from "./popup.js";

//View photo popup elements
const viewPhotoPopup = document.querySelector(`.popup_type_view-photo`);
const popupCaption = viewPhotoPopup.querySelector(`.popup__caption`);
const popupImage = viewPhotoPopup.querySelector(`.popup__image`);

function handleImageView(name, link) {
  popupImage.setAttribute(`src`, link);
  popupImage.setAttribute(`alt`, name);
  popupCaption.textContent = name;
  openPopup(viewPhotoPopup);
}

function handleCardRemove(evt, item) {
  evt.target.closest(item.cardClass).remove();
}

function toggleLike(evt, item) {
  evt.target.classList.toggle(item.likeActiveClass);
}

export function generateCardElement({ name, link }) {
  const cardTemplate = document.querySelector(`#card-template`).content;
  const cardElement = cardTemplate.querySelector(`.element`).cloneNode(true);
  const deleteButton = cardElement.querySelector(`.element__delete-button`);
  const likeButton = cardElement.querySelector(`.element__like-button`);
  const cardPhoto = cardElement.querySelector(`.element__image`);

  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardElement.querySelector(`.element__title`).textContent = name;

  deleteButton.addEventListener(`click`, (evt) => handleCardRemove(evt, card));

  likeButton.addEventListener(`click`, (evt) => toggleLike(evt, card));

  cardPhoto.addEventListener(`click`, () => handleImageView(name, link));

  return cardElement;
}

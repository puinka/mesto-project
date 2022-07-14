import { apiConfig, classConfig } from "./config.js";
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

function generateCardElement({ name, link, owner }) {
  const cardTemplate = document.querySelector(`#card-template`).content;
  const cardElement = cardTemplate.querySelector(`.element`).cloneNode(true);
  const deleteButton = cardElement.querySelector(`.element__delete-button`);
  const likeButton = cardElement.querySelector(`.element__like-button`);
  const cardPhoto = cardElement.querySelector(`.element__image`);

  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardElement.querySelector(`.element__title`).textContent = name;

  if (owner._id !== apiConfig.myId) {
    deleteButton.remove();
  }

  deleteButton.addEventListener(`click`, (evt) =>
    handleCardRemove(evt, classConfig)
  );

  likeButton.addEventListener(`click`, (evt) => toggleLike(evt, classConfig));

  cardPhoto.addEventListener(`click`, () => handleImageView(name, link));

  return cardElement;
}

function renderElementsSection(arr, container) {
  arr.forEach((item) => {
    const card = generateCardElement(item);
    container.append(card);
  });
}

export { renderElementsSection };

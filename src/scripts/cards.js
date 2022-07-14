import { deleteCard } from "./api.js";
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

function handleCardRemove(evt, cardId) {
  evt.target.closest(classConfig.cardClass).remove();
  deleteCard(cardId);
}

function toggleLike(evt, item) {
  evt.target.classList.toggle(item.likeActiveClass);
}
function handleLikeClick(evt) {
  evt.preventDefault();
  console.log("Click like!");
}

function generateCardElement({ name, link, owner, likes, _id }) {
  const cardTemplate = document.querySelector(`#card-template`).content;
  const cardElement = cardTemplate
    .querySelector(classConfig.cardClass)
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(classConfig.deleteButtonClass);
  const likeButton = cardElement.querySelector(classConfig.likeButtonClass);
  const likesAmount = cardElement.querySelector(`.element__likes-amount`);
  const cardPhoto = cardElement.querySelector(`.element__image`);

  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardElement.querySelector(`.element__title`).textContent = name;
  likesAmount.textContent = likes.length;

  if (owner._id !== apiConfig.myId) {
    deleteButton.remove();
  }

  deleteButton.addEventListener(`click`, (evt) => handleCardRemove(evt, _id));

  if (likes.includes(apiConfig.myId)) {
    likeButton.classList.add(classConfig.likeActiveClass);
  }

  //likeButton.addEventListener(`click`, (evt) => toggleLike(evt, classConfig));

  likeButton.addEventListener(`click`, (evt) => handleLikeClick(evt));

  cardPhoto.addEventListener(`click`, () => handleImageView(name, link));

  return cardElement;
}

function renderElementsSection(arr, container) {
  arr.forEach((item) => {
    const card = generateCardElement(item);
    container.append(card);
  });
}

export { generateCardElement, renderElementsSection };

import { deleteCard, giveLike, takeLike } from "./api.js";
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

function handleLikeClick(likeButton) {
  const parentCard = likeButton.closest(classConfig.cardClass);
  const cardId = parentCard.dataset.parent;
  const likesCounter = parentCard.querySelector(classConfig.likesCounter);

  if (!likeButton.classList.contains(classConfig.likeActiveClass)) {
    giveLike(cardId)
      .then((data) => {
        likeButton.classList.add(classConfig.likeActiveClass);
        likesCounter.textContent = `${data.likes.length}`;
      })
      .catch((err) => console.log(err));
  } else {
    takeLike(cardId)
      .then((data) => {
        likeButton.classList.remove(classConfig.likeActiveClass);
        likesCounter.textContent = `${data.likes.length}`;
      })
      .catch((err) => console.log(err));
  }
}

function generateCardElement({ name, link, owner, likes, _id }) {
  const cardTemplate = document.querySelector(`#card-template`).content;
  const cardElement = cardTemplate
    .querySelector(classConfig.cardClass)
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(classConfig.deleteButtonClass);
  const likeButton = cardElement.querySelector(classConfig.likeButtonClass);
  const likesAmount = cardElement.querySelector(classConfig.likesCounter);
  const cardPhoto = cardElement.querySelector(classConfig.cardPhoto);

  cardElement.setAttribute(`data-parent`, _id);
  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardElement.querySelector(classConfig.cardTitle).textContent = name;
  likesAmount.textContent = likes.length;

  if (owner._id !== apiConfig.myId) {
    deleteButton.remove();
  }

  deleteButton.addEventListener(`click`, (evt) => handleCardRemove(evt, _id));

  if (likes.some((item) => item._id === apiConfig.myId)) {
    likeButton.classList.add(classConfig.likeActiveClass);
  }

  cardPhoto.addEventListener(`click`, () => handleImageView(name, link));

  return cardElement;
}

function renderElementsSection(arr, container) {
  arr.forEach((item) => {
    const card = generateCardElement(item);
    container.append(card);
  });
}

export { generateCardElement, renderElementsSection, handleLikeClick };

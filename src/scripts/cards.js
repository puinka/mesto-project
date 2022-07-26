import { deleteCard, giveLike, takeLike } from "./api.js";
import { classConfig } from "./utils/constants.js";
import { openPopup, closePopup } from "./popup.js";

const cardTemplate = document.querySelector(`#card-template`).content;

//View photo popup elements
const viewPhotoPopup = document.querySelector(`.popup_type_view-photo`);
const popupCaption = viewPhotoPopup.querySelector(`.popup__caption`);
const popupImage = viewPhotoPopup.querySelector(`.popup__image`);

//Confirmation popup
const confirmationPopup = document.querySelector(`.popup_type_confirm-removal`);
const confirmationButton =
  confirmationPopup.querySelector(`.form__submit-button`);

confirmationButton.addEventListener(`click`, () => {
  const cardId = confirmationPopup.dataset.id;
  handleCardRemove(cardId);
});

function handleImageView(name, link) {
  popupImage.setAttribute(`src`, link);
  popupImage.setAttribute(`alt`, name);
  popupCaption.textContent = name;
  openPopup(viewPhotoPopup);
}

function handleCardRemove(cardId) {
  const currentCard = document.querySelector(`[data-id='${cardId}']`);

  deleteCard(cardId)
    .then(() => {
      closePopup(confirmationPopup);
      currentCard.remove();
    })
    .catch((err) => console.log(err));
}

function handleLikeClick(cardId, likeButton, likesCounter) {
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

function generateCardElement({ name, link, owner, likes, _id }, myId) {
  const cardElement = cardTemplate
    .querySelector(classConfig.cardClass)
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(classConfig.deleteButtonClass);
  const likeButton = cardElement.querySelector(classConfig.likeButtonClass);
  const likesCounter = cardElement.querySelector(classConfig.likesCounter);
  const cardPhoto = cardElement.querySelector(classConfig.cardPhoto);

  cardElement.dataset.id = _id;
  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardElement.querySelector(classConfig.cardTitle).textContent = name;
  likesCounter.textContent = likes.length;

  if (owner._id !== myId) {
    deleteButton.remove();
  }

  deleteButton.addEventListener(`click`, () => {
    openPopup(confirmationPopup);
    confirmationPopup.dataset.id = _id;
  });

  if (likes.some((item) => item._id === myId)) {
    likeButton.classList.add(classConfig.likeActiveClass);
  }

  likeButton.addEventListener(`click`, () => {
    handleLikeClick(_id, likeButton, likesCounter);
  });

  cardPhoto.addEventListener(`click`, () => handleImageView(name, link));

  return cardElement;
}

function renderElementsSection(arr, container, myId) {
  arr.forEach((item) => {
    const card = generateCardElement(item, myId);
    container.append(card);
  });
}

export { generateCardElement, renderElementsSection, handleCardRemove };

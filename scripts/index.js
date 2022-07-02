import { initialCards } from "./data.js";
import { generateCardElement } from "./cards.js";
import {
  openPopup,
  popupEditProfile,
  fillEditProfileInputs,
  popupEditAvatar,
  popupAddPlace,
} from "./popup.js";

const elementsSection = document.querySelector(`.elements`);

//Profile elements

const profile = document.querySelector(`.profile`);
const profileUserName = profile.querySelector(`.profile__name`);
const profileUserOccupation = profile.querySelector(`.profile__occupation`);
const buttonEditProfile = profile.querySelector(`.profile__edit-button`);
const buttonAddPlace = profile.querySelector(`.profile__add-button`);
const buttonEditAvatar = profile.querySelector(`.profile__avatar-edit-button`);

// event listeners

buttonEditProfile.addEventListener(`click`, function () {
  openPopup(popupEditProfile);
  fillEditProfileInputs();
});

buttonAddPlace.addEventListener(`click`, function () {
  openPopup(popupAddPlace);
});

buttonEditAvatar.addEventListener(`click`, function () {
  openPopup(popupEditAvatar);
});

//render

function renderElementsSection(arr) {
  arr.forEach((item) => {
    const card = generateCardElement(item);
    elementsSection.append(card);
  });
}

renderElementsSection(initialCards);

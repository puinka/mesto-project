import { initialCards } from "./data.js";
import { generateCardElement } from "./cards.js";
import { openPopup, closePopup } from "./popup.js";

const elementsSection = document.querySelector(`.elements`);

//Profile elements

const profile = document.querySelector(`.profile`);
const profileUserName = profile.querySelector(`.profile__name`);
const profileUserOccupation = profile.querySelector(`.profile__occupation`);
const buttonEditProfile = profile.querySelector(`.profile__edit-button`);
const buttonAddPlace = profile.querySelector(`.profile__add-button`);
const buttonEditAvatar = profile.querySelector(`.profile__avatar-edit-button`);

//All close popup buttons
const popupCloseButtons = document.querySelectorAll(`.popup__close-button`);

//Edit Profile popup elements
const popupEditProfile = document.querySelector(`.popup_type_edit-profile`);
const formEditProfile = popupEditProfile.querySelector(
  `.form_type_edit-profile`
);
const inputUserName = popupEditProfile.querySelector(
  `.popup__text-input_type_user-name`
);
const inputUserOccupation = popupEditProfile.querySelector(
  `.popup__text-input_type_user-occupation`
);

//Add place popup elements
const popupAddPlace = document.querySelector(`.popup_type_add-place`);
const formAddPlace = popupAddPlace.querySelector(`.form_type_add-place`);
const inputPlaceName = formAddPlace.querySelector(
  `.popup__text-input_type_place-name`
);
const inputPlaceLink = formAddPlace.querySelector(
  `.popup__text-input_type_place-link`
);

//Edit avatar popup elements
const popupEditAvatar = document.querySelector(`.popup_type_edit-avatar`);
const formEditAvatar = popupEditAvatar.querySelector(`.form_type_edit-avatar`);
const inputAvatarLink = formEditAvatar.querySelector(
  `.popup__text-input_type_avatar-link`
);

//functions
function fillEditProfileInputs() {
  inputUserName.value = profileUserName.textContent;
  inputUserOccupation.value = profileUserOccupation.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUserName.textContent = inputUserName.value;
  profileUserOccupation.textContent = inputUserOccupation.value;
  closePopup(popupEditProfile);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  closePopup(popupAddPlace);
  const place = { name: inputPlaceName.value, link: inputPlaceLink.value };
  const card = generateCardElement(place);
  elementsSection.prepend(card);
  evt.target.reset();
}

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

// Event listeners

formEditProfile.addEventListener(`submit`, handleProfileFormSubmit);
formAddPlace.addEventListener(`submit`, handleAddFormSubmit);

popupCloseButtons.forEach(function (button) {
  button.addEventListener(`click`, function () {
    const popup = button.closest(`.popup`);
    closePopup(popup);
  });
});

//render

function renderElementsSection(arr) {
  arr.forEach((item) => {
    const card = generateCardElement(item);
    elementsSection.append(card);
  });
}

renderElementsSection(initialCards);

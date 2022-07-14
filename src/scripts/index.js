import "../css/pages/index.css";
import { initialCards } from "./data.js";
import { classConfig, apiConfig } from "./config.js";
import { generateCardElement } from "./cards.js";
import { openPopup, closePopup } from "./popup.js";
import { enableValidation } from "./validate.js";

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
const formEditProfile = document.forms.editProfile;
const inputUserName = formEditProfile.elements.userName;
const inputUserOccupation = formEditProfile.elements.userOccupation;

//Add place popup elements
const popupAddPlace = document.querySelector(`.popup_type_add-place`);
const formAddPlace = document.forms.addPlace;
const inputPlaceName = formAddPlace.elements.placeName;
const inputPlaceLink = formAddPlace.elements.placeLink;

//Edit avatar popup elements
const popupEditAvatar = document.querySelector(`.popup_type_edit-avatar`);
const formEditAvatar = document.forms.editAvatar;
const inputAvatarLink = formEditAvatar.elements.avatarLink;

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

function handleAddFormSubmit(evt, config) {
  evt.preventDefault();
  const buttonElement = evt.target.elements.create;
  closePopup(popupAddPlace);
  const place = { name: inputPlaceName.value, link: inputPlaceLink.value };
  const card = generateCardElement(place);
  elementsSection.prepend(card);
  buttonElement.classList.add(config.buttonDisabledClass);
  buttonElement.disabled = true;
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

formEditProfile.addEventListener(`submit`, handleProfileFormSubmit);
formAddPlace.addEventListener(`submit`, (evt) =>
  handleAddFormSubmit(evt, classConfig)
);

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

//validation
enableValidation(classConfig);

//test

fetch("https://nomoreparties.co/v1/plus-cohort-12/users/me", {
  method: "GET",
  headers: {
    authorization: apiConfig.token,
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });

import "../css/pages/index.css";
import { classConfig } from "./config.js";
import {
  getCards,
  getProfile,
  patchProfile,
  patchAvatar,
  postCard,
} from "./api.js";
import {
  renderElementsSection,
  generateCardElement,
  handleLikeClick,
  handleCardRemove,
} from "./cards.js";
import { openPopup, closePopup, handlePopupCloseClick } from "./popup.js";
import { enableValidation } from "./validate.js";

const elementsSection = document.querySelector(`.elements`);

//Profile elements
const profile = document.querySelector(`.profile`);
const profileUserName = profile.querySelector(`.profile__name`);
const profileUserOccupation = profile.querySelector(`.profile__occupation`);
const profileAvatar = profile.querySelector(`.profile__avatar-image`);
const buttonEditProfile = profile.querySelector(`.profile__edit-button`);
const buttonAddPlace = profile.querySelector(`.profile__add-button`);
const buttonEditAvatar = profile.querySelector(`.profile__avatar-edit-button`);

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
  const buttonElement = evt.target.elements.submit;
  buttonElement.textContent = `Сохранение...`;
  patchProfile(inputUserName.value, inputUserOccupation.value)
    .then((user) => {
      profileUserName.textContent = user.name;
      profileUserOccupation.textContent = user.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      buttonElement.textContent = `Сохранить`;
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const buttonElement = evt.target.elements.submit;
  buttonElement.textContent = `Сохранение...`;
  patchAvatar(inputAvatarLink.value)
    .then((user) => {
      profileAvatar.src = user.avatar;
      closePopup(popupEditAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      buttonElement.textContent = `Сохранить`;
      buttonElement.classList.add(classConfig.buttonDisabledClass);
      buttonElement.disabled = true;
      evt.target.reset();
    });
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const buttonElement = evt.target.elements.create;
  buttonElement.textContent = `Сохранение...`;
  const place = { name: inputPlaceName.value, link: inputPlaceLink.value };
  postCard(place)
    .then((item) => {
      const card = generateCardElement(item);
      elementsSection.prepend(card);
      closePopup(popupAddPlace);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      buttonElement.textContent = `Создать`;
      buttonElement.classList.add(classConfig.buttonDisabledClass);
      buttonElement.disabled = true;
      evt.target.reset();
    });
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

formEditProfile.addEventListener(`submit`, (evt) =>
  handleProfileFormSubmit(evt, inputUserName, inputUserOccupation)
);

formEditAvatar.addEventListener(`submit`, (evt) =>
  handleAvatarFormSubmit(evt, inputAvatarLink)
);

formAddPlace.addEventListener(`submit`, (evt) =>
  handleAddFormSubmit(evt, classConfig)
);

document.addEventListener(`click`, (evt) => {
  if (evt.target.classList.contains(`popup__close-button`)) {
    handlePopupCloseClick(evt.target);
  }
});

elementsSection.addEventListener(`click`, (evt) => {
  if (evt.target.classList.contains(`element__delete-button`)) {
    handleCardRemove(evt.target);
  }
});

elementsSection.addEventListener(`click`, (evt) => {
  if (evt.target.classList.contains(`element__like-button`)) {
    handleLikeClick(evt.target);
  }
});

//validation
enableValidation(classConfig);

//render page
Promise.all([getProfile(), getCards()])
  .then(([profile, cards]) => {
    profileUserName.textContent = profile.name;
    profileUserOccupation.textContent = profile.about;
    profileAvatar.src = profile.avatar;
    renderElementsSection(cards, elementsSection);
  })
  .catch((err) => console.log(err));

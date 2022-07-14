import "../css/pages/index.css";
import { classConfig, apiConfig } from "./config.js";
import { getCards, getProfile, patchProfile, postCard } from "./api.js";
import { renderElementsSection, generateCardElement } from "./cards.js";
import { openPopup, closePopup } from "./popup.js";
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
  patchProfile(inputUserName.value, inputUserOccupation.value)
    .then((user) => {
      profileUserName.textContent = user.name;
      profileUserOccupation.textContent = user.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => console.log(err));
}

function handleAddFormSubmit(evt, config) {
  evt.preventDefault();
  const place = { name: inputPlaceName.value, link: inputPlaceLink.value };
  postCard(place)
    .then((item) => {
      const card = generateCardElement(item);
      elementsSection.prepend(card);
      closePopup(popupAddPlace);
    })
    .catch((err) => console.log(err));

  const buttonElement = evt.target.elements.create;
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

formEditProfile.addEventListener(`submit`, (evt) =>
  handleProfileFormSubmit(evt, inputUserName, inputUserOccupation)
);

formAddPlace.addEventListener(`submit`, (evt) =>
  handleAddFormSubmit(evt, classConfig)
);

popupCloseButtons.forEach(function (button) {
  button.addEventListener(`click`, function () {
    const popup = button.closest(`.popup`);
    closePopup(popup);
  });
});

//validation
enableValidation(classConfig);

//render page
Promise.all([getProfile(), getCards()]).then(([profile, cards]) => {
  profileUserName.textContent = profile.name;
  profileUserOccupation.textContent = profile.about;
  profileAvatar.src = profile.avatar;
  renderElementsSection(cards, elementsSection);
});

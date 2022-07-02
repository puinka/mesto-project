//All close popup buttons
const popupCloseButtons = document.querySelectorAll(`.popup__close-button`);

//Edit Profile popup elements
const popupEditProfile = document.querySelector(`.popup_type_edit-profile`);
const formEditProfile = popupEditProfile.querySelector(
  `.popup__form_type_edit-profile`
);
const inputUserName = popupEditProfile.querySelector(
  `.popup__text-input_type_user-name`
);
const inputUserOccupation = popupEditProfile.querySelector(
  `.popup__text-input_type_user-occupation`
);

//Add place popup elements
const popupAddPlace = document.querySelector(`.popup_type_add-place`);
const formAddPlace = popupAddPlace.querySelector(`.popup__form_type_add-place`);
const inputPlaceName = formAddPlace.querySelector(
  `.popup__text-input_type_place-name`
);
const inputPlaceLink = formAddPlace.querySelector(
  `.popup__text-input_type_place-link`
);

//View photo popup elements
const viewPhotoPopup = document.querySelector(`.popup_type_view-photo`);
const popupCaption = viewPhotoPopup.querySelector(`.popup__caption`);
const popupImage = viewPhotoPopup.querySelector(`.popup__image`);

//Edit avatar popup elements
const popupEditAvatar = document.querySelector(`.popup_type_edit-avatar`);
const formEditAvatar = popupEditAvatar.querySelector(
  `.popup__form_type_edit-avatar`
);
const inputAvatarLink = formEditAvatar.querySelector(
  `.popup__text-input_type_avatar-link`
);

// functions declaration

function handleEscKey(evt) {
  const currentPopup = document.querySelector(`.popup_open`);
  if (evt.key === `Escape`) {
    closePopup(currentPopup);
  }
}

function handlePopupMouseClick(evt) {
  const currentPopup = document.querySelector(`.popup_open`);
  if (evt.target.classList.contains(`popup_open`)) {
    closePopup(currentPopup);
  }
}

function openPopup(popup) {
  popup.classList.add(`popup_open`);
  document.addEventListener(`keydown`, handleEscKey);
  popup.addEventListener(`click`, handlePopupMouseClick);
}

function closePopup(popup) {
  popup.classList.remove(`popup_open`);
  document.removeEventListener(`keydown`, handleEscKey);
  popup.removeEventListener(`click`, handlePopupMouseClick);
}

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

function handleImageView(name, link) {
  popupImage.setAttribute(`src`, link);
  popupImage.setAttribute(`alt`, name);
  popupCaption.textContent = name;
  openPopup(viewPhotoPopup);
}

// Event listeners

formEditProfile.addEventListener(`submit`, handleProfileFormSubmit);
formAddPlace.addEventListener(`submit`, handleAddFormSubmit);

popupCloseButtons.forEach(function (button) {
  button.addEventListener(`click`, function () {
    const popup = button.closest(`.popup`);
    closePopup(popup);
  });
});

export {
  openPopup,
  closePopup,
  popupEditProfile,
  fillEditProfileInputs,
  popupEditAvatar,
  popupAddPlace,
  handleImageView,
};

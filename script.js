const popupEditProfile = document.querySelector(`.popup_type_edit-profile`);
const buttonCloseEditProfile =
  popupEditProfile.querySelector(`.popup__close-button`);
const formEditProfile = popupEditProfile.querySelector(
  `.popup__form_type_edit-profile`
);
const inputUserName = popupEditProfile.querySelector(
  `.popup__text-input_type_user-name`
);
const inputUserOccupation = popupEditProfile.querySelector(
  `.popup__text-input_type_user-occupation`
);

const popupAddPlace = document.querySelector(`.popup_type_add-place`);
const buttonCloseAddPlace = popupAddPlace.querySelector(`.popup__close-button`);
const formAddPlace = popupAddPlace.querySelector(`.popup__form_type_add-place`);

const profile = document.querySelector(`.profile`);
const profileUserName = profile.querySelector(`.profile__name`);
const profileUserOccupation = profile.querySelector(`.profile__occupation`);
const buttonEditProfile = profile.querySelector(`.profile__edit-button`);
const buttonAddPlace = profile.querySelector(`.profile__add-button`);

function fillEditProfileInputs() {
  inputUserName.value = profileUserName.textContent;
  inputUserOccupation.value = profileUserOccupation.textContent;
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileUserName.textContent = inputUserName.value;
  profileUserOccupation.textContent = inputUserOccupation.value;
  popupEditProfile.classList.remove(`popup_open`);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  popupAddPlace.classList.remove(`popup_open`);
}

buttonCloseEditProfile.addEventListener(`click`, function () {
  popupEditProfile.classList.remove(`popup_open`);
});

buttonEditProfile.addEventListener(`click`, function () {
  popupEditProfile.classList.add(`popup_open`);
  fillEditProfileInputs();
});

formEditProfile.addEventListener(`submit`, editFormSubmitHandler);

fillEditProfileInputs();

buttonAddPlace.addEventListener(`click`, function () {
  popupAddPlace.classList.add(`popup_open`);
});

buttonCloseAddPlace.addEventListener(`click`, function () {
  popupAddPlace.classList.remove(`popup_open`);
});

formAddPlace.addEventListener(`submit`, addFormSubmitHandler);

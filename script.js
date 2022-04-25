let popupEditProfile = document.querySelector(`.popup_type_edit-profile`);
let buttonCloseEditProfile =
  popupEditProfile.querySelector(`.popup__close-button`);
let inputUserName = popupEditProfile.querySelector(
  `.popup__text-input_type_user-name`
);
let inputUserOccupation = popupEditProfile.querySelector(
  `.popup__text-input_type_user-occupation`
);

let profile = document.querySelector(`.profile`);
let profileUserName = profile.querySelector(`.profile__name`);
let profileUserOccupation = profile.querySelector(`.profile__occupation`);
let buttonEditProfile = profile.querySelector(`.profile__edit-button`);

let fillEditProfileInputs = function () {
  inputUserName.value = profileUserName.textContent;
  inputUserOccupation.value = profileUserOccupation.textContent;
};

buttonCloseEditProfile.addEventListener(`click`, function () {
  popupEditProfile.classList.remove(`popup_open`);
});

buttonEditProfile.addEventListener(`click`, function () {
  popupEditProfile.classList.add(`popup_open`);
  fillEditProfileInputs();
});

fillEditProfileInputs();

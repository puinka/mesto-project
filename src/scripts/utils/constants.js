export const classConfig = {
  formClass: `.form`,
  textInputClass: `.form__text-input`,
  submitButtonClass: `.form__submit-button`,
  inputErrorClass: `form__text-input_type_error`,
  buttonDisabledClass: `form__submit-button_inactive`,
  cardClass: `.element`,
  cardPhoto: `.element__image`,
  deleteButtonClass: `.element__delete-button`,
  likeButtonClass: `.element__like-button`,
  likeActiveClass: `element__like-button-active`,
  likesCounter: `.element__likes-amount`,
  cardTitle: `.element__title`,
  cardContainer: `.elements`,
};

export const apiConfig = {
  serverURL: "https://nomoreparties.co/v1/plus-cohort-12",
  headers: {
    authorization: "990d24ba-7f92-4fb3-a188-40b44340a14f",
    "Content-Type": "application/json",
  },
};

export const popupSelector = {
  editProfile: `.popup_type_edit-profile`,
  addPlace: `.popup_type_add-place`,
  viewPhoto: `.popup_type_view-photo`,
  editAvatar: `.popup_type_edit-avatar`,
  deleteCard: `.popup_type_confirm-removal`,
};

export const profileSelector = {
  profileUserName: `.profile__name`,
  profileUserOccupation: `.profile__occupation`,
  profileAvatar: `.profile__avatar-image`,
};

export const defaultText = {
  addCard: `Создать`,
  save: `Сохранить`,
};

export const cardTemplate = document.querySelector(`#card-template`).content;

//Profile elements
const profile = document.querySelector(`.profile`);
export const buttonEditProfile = profile.querySelector(`.profile__edit-button`);
export const buttonAddPlace = profile.querySelector(`.profile__add-button`);
export const buttonEditAvatar = profile.querySelector(
  `.profile__avatar-edit-button`
);

//Edit Profile popup elements
export const formEditProfile = document.forms.editProfile;
export const inputUserName = formEditProfile.elements.userName;
export const inputUserOccupation = formEditProfile.elements.userOccupation;

//Add place form
export const formAddPlace = document.forms.addPlace;

//Popup with image
export const popupWithImage = document.querySelector(".popup_type_view-photo");
export const popupImage = popupWithImage.querySelector(`.popup__image`);
export const popupText = popupWithImage.querySelector(".popup__caption");

//Edit avatar form
export const formEditAvatar = document.forms.editAvatar;

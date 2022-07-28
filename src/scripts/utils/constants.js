const classConfig = {
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
};

export const cardTemplate = document.querySelector(`#card-template`).content;
export const elementsSection = document.querySelector(`.elements`);

//Profile elements
export const profile = document.querySelector(`.profile`);
export const profileUserName = profile.querySelector(`.profile__name`);
export const profileUserOccupation = profile.querySelector(`.profile__occupation`);
export const profileAvatar = profile.querySelector(`.profile__avatar-image`);
export const buttonEditProfile = profile.querySelector(`.profile__edit-button`);
export const buttonAddPlace = profile.querySelector(`.profile__add-button`);
export const buttonEditAvatar = profile.querySelector(`.profile__avatar-edit-button`);

//Edit Profile popup elements
export const popupEditProfile = document.querySelector(`.popup_type_edit-profile`);
export const formEditProfile = document.forms.editProfile;
export const inputUserName = formEditProfile.elements.userName;
export const inputUserOccupation = formEditProfile.elements.userOccupation;

//Add place popup elements
export const popupAddPlace = document.querySelector(`.popup_type_add-place`);
export const formAddPlace = document.forms.addPlace;
export const inputPlaceName = formAddPlace.elements.placeName;
export const inputPlaceLink = formAddPlace.elements.placeLink;

//Edit avatar popup elements
export const popupEditAvatar = document.querySelector(`.popup_type_edit-avatar`);
export const formEditAvatar = document.forms.editAvatar;
export const inputAvatarLink = formEditAvatar.elements.avatarLink;

//User ID
export let myId;


export { classConfig };

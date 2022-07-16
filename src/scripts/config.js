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

const apiConfig = {
  serverURL: "https://nomoreparties.co/v1/plus-cohort-12",
  headers: {
    authorization: "990d24ba-7f92-4fb3-a188-40b44340a14f",
    "Content-Type": "application/json",
  },
};

export { classConfig, apiConfig };

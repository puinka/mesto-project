const popupEditProfile = document.querySelector(`.popup_type_edit-profile`);
const popupCloseButtons = document.querySelectorAll(`.popup__close-button`);
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
const formAddPlace = popupAddPlace.querySelector(`.popup__form_type_add-place`);
const inputPlaceName = formAddPlace.querySelector(
  `.popup__text-input_type_place-name`
);
const inputPlaceLink = formAddPlace.querySelector(
  `.popup__text-input_type_place-link`
);

const profile = document.querySelector(`.profile`);
const profileUserName = profile.querySelector(`.profile__name`);
const profileUserOccupation = profile.querySelector(`.profile__occupation`);
const buttonEditProfile = profile.querySelector(`.profile__edit-button`);
const buttonAddPlace = profile.querySelector(`.profile__add-button`);

const elementsSection = document.querySelector(`.elements`);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const viewPhotoPopup = document.querySelector(`.popup_type_view-photo`);
const popupCaption = viewPhotoPopup.querySelector(`.popup__caption`);
const popupImage = viewPhotoPopup.querySelector(`.popup__image`);

// functions declaration

function openPopup(popup) {
  popup.classList.add(`popup_open`);
}

function closePopup(popup) {
  popup.classList.remove(`popup_open`);
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
  const card = createCard(place);
  elementsSection.prepend(card);
  evt.target.reset();
}

function generateCardElement({ name, link }) {
  const cardTemplate = document.querySelector(`#card-template`).content;
  const cardElement = cardTemplate.querySelector(`.element`).cloneNode(true);

  cardElement.querySelector(`.element__image`).src = link;
  cardElement.querySelector(`.element__image`).alt = name;
  cardElement.querySelector(`.element__title`).textContent = name;

  return cardElement;
}

function createCard(item) {
  const newCard = generateCardElement(item);
  const deleteButton = newCard.querySelector(`.element__delete-button`);
  const likeButton = newCard.querySelector(`.element__like-button`);
  const cardPhoto = newCard.querySelector(`.element__image`);

  deleteButton.addEventListener(`click`, function () {
    deleteButton.closest(`.element`).remove();
  });

  likeButton.addEventListener(`click`, function (evt) {
    evt.target.classList.toggle(`element__like-button-active`);
  });

  cardPhoto.addEventListener(`click`, handleImageView);

  return newCard;
}

function renderElementsSection(arr) {
  arr.forEach(function (item) {
    const card = createCard(item);
    elementsSection.append(card);
  });
}

function handleImageView(evt) {
  evt.preventDefault();
  const cardImage = evt.target;
  const link = cardImage.src;
  popupImage.setAttribute(`src`, link);
  popupCaption.textContent = cardImage.alt;
  openPopup(viewPhotoPopup);
}

// event listeners

popupCloseButtons.forEach(function (button) {
  button.addEventListener(`click`, function () {
    const popup = button.closest(`.popup`);
    closePopup(popup);
  });
});

buttonEditProfile.addEventListener(`click`, function () {
  openPopup(popupEditProfile);
  fillEditProfileInputs();
});

formEditProfile.addEventListener(`submit`, handleProfileFormSubmit);

buttonAddPlace.addEventListener(`click`, function () {
  openPopup(popupAddPlace);
});

formAddPlace.addEventListener(`submit`, handleAddFormSubmit);

// call functions

renderElementsSection(initialCards);

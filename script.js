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

const elements = document.querySelector(`.elements`);

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

// functions declaration

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
  let place = { name: inputPlaceName.value, link: inputPlaceLink.value };
  renderElement(place, `afterBegin`);
  inputPlaceName.value = ``;
  inputPlaceLink.value = ``;
}

function renderElement({ name, link }, order) {
  let elementHTML = `
  <article class="element">
        <img
            src="${link}"
            alt="${name}"
            class="element__image"
        />
        <div class="element__info">
            <h3 class="element__title">${name}</h3>
            <button class="element__like-button" type="button"></button>
        </div>
    </article>`;
  elements.insertAdjacentHTML(order, elementHTML);
}

function renderElementsSection(arr, order = `beforeEnd`) {
  arr.forEach(function ({ name, link }) {
    renderElement({ name, link }, order);
  });
}

// event listeners

buttonCloseEditProfile.addEventListener(`click`, function () {
  popupEditProfile.classList.remove(`popup_open`);
});

buttonEditProfile.addEventListener(`click`, function () {
  popupEditProfile.classList.add(`popup_open`);
  fillEditProfileInputs();
});

formEditProfile.addEventListener(`submit`, editFormSubmitHandler);

buttonAddPlace.addEventListener(`click`, function () {
  popupAddPlace.classList.add(`popup_open`);
});

buttonCloseAddPlace.addEventListener(`click`, function () {
  popupAddPlace.classList.remove(`popup_open`);
});

formAddPlace.addEventListener(`submit`, addFormSubmitHandler);

// call functions

fillEditProfileInputs();

renderElementsSection(initialCards);

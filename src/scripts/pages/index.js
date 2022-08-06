import "../../css/pages/index.css";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

///////

//import { generateCardElement } from "../cards.js";
//import { openPopup, closePopup, handlePopupCloseClick } from "../popup.js";
//import { enableValidation } from "../validate.js";
import {
  apiConfig,
  buttonEditProfile,
  buttonAddPlace,
  buttonEditAvatar,
  formEditProfile,
  formEditAvatar,
  formAddPlace,
  classConfig,
  profileUserName,
  profileUserOccupation,
  popupSelector,
} from "../utils/constants.js";

// import { giveLike } from "../api";

//User ID
let myId;

const api = new Api(apiConfig);
const userInfo = new UserInfo();
const cardList = new Section(generateCard, classConfig.cardContainer);

//edit avatar popup
const popupEditAvatar = new PopupWithForm(
  popupSelector.editAvatar,
  handleEditAvatarSubmit
);
popupEditAvatar.setEventListeners();

//functions
// function fillEditProfileInputs() {
//   inputUserName.value = profileUserName.textContent;
//   inputUserOccupation.value = profileUserOccupation.textContent;
// }

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

// function handleAvatarFormSubmit(evt) {
//   evt.preventDefault();
//   const buttonElement = evt.target.elements.submit;
//   buttonElement.textContent = `Сохранение...`;
//   patchAvatar(inputAvatarLink.value)
//     .then((user) => {
//       profileAvatar.src = user.avatar;
//       closePopup(popupEditAvatar);
//     })
//     .catch((err) => console.log(err))
//     .finally(() => {
//       buttonElement.textContent = `Сохранить`;
//       buttonElement.classList.add(classConfig.buttonDisabledClass);
//       buttonElement.disabled = true;
//       evt.target.reset();
//     });
// }

function handleAddFormSubmit(evt, myId) {
  evt.preventDefault();
  const buttonElement = evt.target.elements.create;
  buttonElement.textContent = `Сохранение...`;
  const place = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value,
  };
  postCard(place)
    .then((item) => {
      //TODO
      //тут использовать cardList.addItem();
      const card = generateCardElement(item, myId);
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
  popupEditAvatar.open();
});

formEditProfile.addEventListener(`submit`, (evt) =>
  handleProfileFormSubmit(evt, inputUserName, inputUserOccupation)
);

// formEditAvatar.addEventListener(`submit`, (evt) =>
//   handleAvatarFormSubmit(evt, inputAvatarLink)
// );

formAddPlace.addEventListener(`submit`, (evt) =>
  handleAddFormSubmit(evt, myId)
);

//validation
//enableValidation(classConfig);

function handleImageClick(image, link) {
  const imagePopup = new PopupWithImage(popupSelector.viewPhoto, image, link);
  imagePopup.open();
  imagePopup.setEventListeners();
}

function handleLikeClick(card) {
  card.isLiked()
    ? api
        .takeLike(card._id)
        .then((data) => {
          card.updateLikes(true, data);
        })
        .catch((err) => console.log(err))
    : api
        .giveLike(card._id)
        .then((data) => {
          card.updateLikes(false, data);
        })
        .catch((err) => console.log(err));
}

//сгенерировать одну карточку
function generateCard(data) {
  const card = new Card(data, myId, handleImageClick, handleLikeClick);
  return card.generate();
}

//popup handler functions
function handleEditAvatarSubmit({ avatarLink }) {
  api.updateAvatar(avatarLink).then((data) => {
    userInfo.renderAvatar(data);
    popupEditAvatar.close();
  });
}

Promise.all([api.getProfile(), api.getCards()])
  .then(([profile, cards]) => {
    myId = profile._id;
    userInfo.getUserInfo(profile);
    userInfo.renderProfileInfo();
    userInfo.renderAvatar(profile);

    //отрендерить все карточки из даты в контейнер
    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));

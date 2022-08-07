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
  formEditAvatar,
  formEditProfile,
  inputUserName,
  inputUserOccupation,
  formAddPlace,
  classConfig,
  popupSelector,
  profileSelector,
} from "../utils/constants.js";

//User ID
let myId;

const api = new Api(apiConfig);
const userInfo = new UserInfo(profileSelector);
const cardList = new Section(generateCard, classConfig.cardContainer);

//edit avatar popup
const popupEditAvatar = new PopupWithForm(
  popupSelector.editAvatar,
  handleEditAvatarSubmit
);
popupEditAvatar.setEventListeners();
const editAvatarValidator = new FormValidator(classConfig, formEditAvatar);
editAvatarValidator.enableValidation();

//edit profile popup
const popupEditProfile = new PopupWithForm(
  popupSelector.editProfile,
  handleEditProfileSubmit
);
popupEditProfile.setEventListeners();
const editProfileValidator = new FormValidator(classConfig, formEditProfile);
editProfileValidator.enableValidation();

//add new card popup
const popupAddNewCard = new PopupWithForm(
  popupSelector.addPlace,
  handleAddNewCardSubmit
);
popupAddNewCard.setEventListeners();
const addNewCardValidator = new FormValidator(classConfig, formAddPlace);
addNewCardValidator.enableValidation();

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   const buttonElement = evt.target.elements.submit;
//   buttonElement.textContent = `Сохранение...`;
//   patchProfile(inputUserName.value, inputUserOccupation.value)
//     .then((user) => {
//       profileUserName.textContent = user.name;
//       profileUserOccupation.textContent = user.about;
//       closePopup(popupEditProfile);
//     })
//     .catch((err) => console.log(err))
//     .finally(() => {
//       buttonElement.textContent = `Сохранить`;
//     });
// }

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

// function handleAddFormSubmit(evt, myId) {
//   evt.preventDefault();
//   const buttonElement = evt.target.elements.create;
//   buttonElement.textContent = `Сохранение...`;
//   const place = {
//     name: inputPlaceName.value,
//     link: inputPlaceLink.value,
//   };
//   postCard(place)
//     .then((item) => {
//       //TODO
//       //тут использовать cardList.addItem();
//       const card = generateCardElement(item, myId);
//       elementsSection.prepend(card);
//       closePopup(popupAddPlace);
//     })
//     .catch((err) => console.log(err))
//     .finally(() => {
//       buttonElement.textContent = `Создать`;
//       buttonElement.classList.add(classConfig.buttonDisabledClass);
//       buttonElement.disabled = true;
//       evt.target.reset();
//     });
// }

// event listeners

buttonEditProfile.addEventListener(`click`, function () {
  const userData = userInfo.getUserInfo();
  popupEditProfile.open();
  inputUserName.value = userData.name;
  inputUserOccupation.value = userData.about;
});

buttonAddPlace.addEventListener(`click`, function () {
  popupAddNewCard.open();
});

buttonEditAvatar.addEventListener(`click`, function () {
  popupEditAvatar.open();
});

// formAddPlace.addEventListener(`submit`, (evt) =>
//   handleAddFormSubmit(evt, myId)
// );

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
  api
    .updateAvatar(avatarLink)
    .then((data) => {
      userInfo.renderAvatar(data);
      popupEditAvatar.close();
    })
    .catch((err) => console.log(err));
}

function handleEditProfileSubmit({ userName, userOccupation }) {
  api
    .updateProfile(userName, userOccupation)
    .then((data) => {
      userInfo.setUserInfo(data);
      userInfo.renderProfileInfo();
      popupEditProfile.close();
    })
    .catch((err) => console.log(err));
}

function handleAddNewCardSubmit({ placeName, placeLink }) {
  api
    .addNewCard(placeName, placeLink)
    .then((data) => {
      const newCard = generateCard(data);
      cardList.addItem(newCard);
      popupAddNewCard.close();
    })
    .catch((err) => console.log(err));
}

Promise.all([api.getProfile(), api.getCards()])
  .then(([profile, cards]) => {
    myId = profile._id;
    userInfo.setUserInfo(profile);
    userInfo.renderProfileInfo();
    userInfo.renderAvatar(profile);

    //отрендерить все карточки из даты в контейнер
    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));

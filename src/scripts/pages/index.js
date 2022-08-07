import "../../css/pages/index.css";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

///////
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
  defaultText,
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

//confirm delete a card popup
const popupConfirmDeleteCard = new PopupWithConfirmation(
  popupSelector.deleteCard,
  handleDeleteCardConfirmation
);
popupConfirmDeleteCard.setEventListeners();

//popup handler functions

function handleEditAvatarSubmit({ avatarLink }) {
  popupEditAvatar.showLoadingText(true);
  api
    .updateAvatar(avatarLink)
    .then((data) => {
      userInfo.renderAvatar(data);
      popupEditAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupEditAvatar.showLoadingText(false));
}

function handleEditProfileSubmit({ userName, userOccupation }) {
  popupEditProfile.showLoadingText(true);
  api
    .updateProfile(userName, userOccupation)
    .then((data) => {
      userInfo.setUserInfo(data);
      userInfo.renderProfileInfo();
      popupEditProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupEditProfile.showLoadingText(false));
}

function handleAddNewCardSubmit({ placeName, placeLink }) {
  popupAddNewCard.showLoadingText(true);
  api
    .addNewCard(placeName, placeLink)
    .then((data) => {
      const newCard = generateCard(data);
      cardList.addItem(newCard);
      popupAddNewCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAddNewCard.showLoadingText(false, defaultText.addCard));
}

function handleDeleteCardConfirmation(cardId) {
  api.deleteCard(cardId).then(() => {
    popupConfirmDeleteCard.card.remove();
    popupConfirmDeleteCard.close();
  });
}

//generate one card

function generateCard(data) {
  const card = new Card(
    data,
    myId,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  );
  return card.generate();
}

//card handler functions

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

function handleDeleteClick(card) {
  popupConfirmDeleteCard.open();
  popupConfirmDeleteCard.setCardData(card);
}

//render cards section

Promise.all([api.getProfile(), api.getCards()])
  .then(([profile, cards]) => {
    myId = profile._id;
    userInfo.setUserInfo(profile);
    userInfo.renderProfileInfo();
    userInfo.renderAvatar(profile);

    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));

// event listeners

buttonEditProfile.addEventListener(`click`, function () {
  const { name, about } = userInfo.getUserInfo();
  popupEditProfile.open();
  inputUserName.value = name;
  inputUserOccupation.value = about;
});

buttonAddPlace.addEventListener(`click`, function () {
  popupAddNewCard.open();
});

buttonEditAvatar.addEventListener(`click`, function () {
  popupEditAvatar.open();
});

import "../../css/pages/index.css";
import Api from "../components/Api.js";
import { Card } from "../components/Card.js";
import {
  renderElementsSection,
  generateCardElement
} from "../cards.js";
import {
  openPopup,
  closePopup,
  handlePopupCloseClick
} from "../popup.js";
import {
  enableValidation
} from "../validate.js";
import {
  apiConfig
} from "../utils/constants";
import {
  buttonEditProfile,
  buttonAddPlace,
  buttonEditAvatar,
  formEditProfile,
  formEditAvatar,
  formAddPlace,
  classConfig,
  profileUserName,
  profileUserOccupation,
  profileAvatar,
  elementsSection,
} from "../utils/constants.js";
import {
  UserInfo
} from "../components/UserInfo.js"
import {
  Section
} from "../components/Section.js"

//User ID
export let myId;

//functions
function fillEditProfileInputs() {
  inputUserName.value = profileUserName.textContent;
  inputUserOccupation.value = profileUserOccupation.textContent;
}

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

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const buttonElement = evt.target.elements.submit;
  buttonElement.textContent = `Сохранение...`;
  patchAvatar(inputAvatarLink.value)
    .then((user) => {
      profileAvatar.src = user.avatar;
      closePopup(popupEditAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      buttonElement.textContent = `Сохранить`;
      buttonElement.classList.add(classConfig.buttonDisabledClass);
      buttonElement.disabled = true;
      evt.target.reset();
    });
}

function handleAddFormSubmit(evt, myId) {
  evt.preventDefault();
  const buttonElement = evt.target.elements.create;
  buttonElement.textContent = `Сохранение...`;
  const place = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value
  };
  postCard(place)
    .then((item) => {
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
  openPopup(popupEditAvatar);
});

formEditProfile.addEventListener(`submit`, (evt) =>
  handleProfileFormSubmit(evt, inputUserName, inputUserOccupation)
);

formEditAvatar.addEventListener(`submit`, (evt) =>
  handleAvatarFormSubmit(evt, inputAvatarLink)
);

formAddPlace.addEventListener(`submit`, (evt) =>
  handleAddFormSubmit(evt, myId)
);

document.addEventListener(`click`, (evt) => {
  if (evt.target.classList.contains(`popup__close-button`)) {
    handlePopupCloseClick(evt.target);
  }
});

//validation
enableValidation(classConfig);



//render page
const api = new Api(apiConfig);
const userInfo = new UserInfo();
Promise.all([api.getProfile(), api.getCards()])
  .then(([profile, cards]) => {
    myId = profile._id;
    userInfo.getUserInfo(profile)
    userInfo.renderProfileInfo();
    ``;
    userInfo.renderAvatar();

    //вызов нашего класса для создания карточек
    const CardList = new Section({
      //в data по идее должна записываться data из запросов getProfile и getCards (пока не знаю как)
      data: cards,
      renderer: (item) => {
        const card = new Card(item);
        const element = card.generate();
        CardList.addItem(element);
      }
    }, elementsSection);

    // renderElementsSection(cards, elementsSection, myId);
    CardList.renderItems(cards);

  })
  .catch((err) => console.log(err));
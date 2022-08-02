import { cardTemplate, classConfig } from "../utils/constants.js";

export default class Card {
  constructor({ name, link, owner, likes, _id }, myId, handleImageClick) {
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._likes = likes;
    this._id = _id;
    this._myId = myId;
    this._handleImageClick = handleImageClick;
  }

  _getElement() {
    const cardElement = cardTemplate
      .querySelector(classConfig.cardClass)
      .cloneNode(true);

    return cardElement;
  }

  // _handleImageView(name, link) {
  //     //нужно решить откуда вытянуть popupImage, popupCaption
  //     popupImage.setAttribute(`src`, link);
  //     popupImage.setAttribute(`alt`, name);
  //     popupCaption.textContent = name;
  //     //импортировать функцию openPopup
  //     //разобраться откуда вытаскивать viewPhotoPopup
  //     openPopup(viewPhotoPopup);
  //   }

  // _handleLikeClick(cardId, likeButton, likesCounter) {
  //     if (!likeButton.classList.contains(classConfig.likeActiveClass)) {
  //       giveLike(cardId)
  //         .then((data) => {
  //           likeButton.classList.add(classConfig.likeActiveClass);
  //           likesCounter.textContent = `${data.likes.length}`;
  //         })
  //         .catch((err) => console.log(err));
  //     } else {
  //       takeLike(cardId)
  //         .then((data) => {
  //           likeButton.classList.remove(classConfig.likeActiveClass);
  //           likesCounter.textContent = `${data.likes.length}`;
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   }

  _setEventListeners() {
    this._likeButton.addEventListener(`click`, () => {
      //посмотреть, нужно ли в параметрах указывать this._ пока не поняли
      this._handleLikeClick(this.__id, this._likeButton, this._likesCounter);
    });

    this._deleteButton.addEventListener(`click`, () => {
      //импортировать функцию openPopup
      //разобраться откуда вытаскивать confirmationPopup
      openPopup(confirmationPopup);
      confirmationPopup.dataset.id = _id;
    });

    this._cardPhoto.addEventListener(`click`, () =>
      this._handleImageClick(this._name, this._link)
    );
  }

  generate() {
    this._element = this._getElement();
    
    this._title = this._element.querySelector(classConfig.cardTitle);
    this._deleteButton = this._element.querySelector(classConfig.deleteButtonClass);
    this._likeButton = this._element.querySelector(classConfig.likeButtonClass);
    this._likesCounter = this._element.querySelector(classConfig.likesCounter);
    this._cardPhoto = this._element.querySelector(classConfig.cardPhoto);
    
    this._likesCounter.textContent = this._likes.length;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._element.dataset.id = this._id;
    this._title.textContent = this._name;
    
    if (this._owner._id !== this._myId) {
      this._deleteButton.remove();
    }
    
    if (this._likes.some((item) => item._id === this._myId)) {
      this._likeButton.classList.add(classConfig.likeActiveClass);
    }
    // console.log("generate card elemtn:", this._element);
    this._setEventListeners();
    return this._element;
  }
}

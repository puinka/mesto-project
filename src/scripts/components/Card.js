import { cardTemplate, classConfig } from "../utils/constants.js";

export default class Card {
  constructor(
    { name, link, owner, likes, _id },
    myId,
    handleImageClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._likes = likes;
    this._id = _id;
    this._myId = myId;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getElement() {
    const cardElement = cardTemplate
      .querySelector(classConfig.cardClass)
      .cloneNode(true);

    return cardElement;
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._myId);
  }

  updateLikes(isLiked, data) {
    if (isLiked) {
      this._likeButton.classList.remove(classConfig.likeActiveClass);
    } else {
      this._likeButton.classList.add(classConfig.likeActiveClass);
    }
    this._likesCounter.textContent = `${data.likes.length}`;
  }

  _setEventListeners() {
    this._cardPhoto.addEventListener(`click`, () =>
      this._handleImageClick(this._name, this._link)
    );

    this._likeButton.addEventListener(`click`, () => {
      this._handleLikeClick(this);
    });

    // this._deleteButton.addEventListener(`click`, () => {
    //   openPopup(confirmationPopup);
    //   confirmationPopup.dataset.id = _id;
    // });
  }

  generate() {
    this._element = this._getElement();

    this._title = this._element.querySelector(classConfig.cardTitle);
    this._deleteButton = this._element.querySelector(
      classConfig.deleteButtonClass
    );
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

    if (this.isLiked()) {
      this._likeButton.classList.add(classConfig.likeActiveClass);
    }

    this._setEventListeners();
    return this._element;
  }
}

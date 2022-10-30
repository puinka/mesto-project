export default class Card {
  constructor(
    { name, link, owner, likes, _id },
    myId,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick,
    cardTemplate,
    selector
  ) {
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._likes = likes;
    this._id = _id;
    this._myId = myId;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._template = cardTemplate;
    this._selector = selector;
  }

  _getElement() {
    const cardElement = this._template
      .querySelector(this._selector.cardClass)
      .cloneNode(true);

    return cardElement;
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._myId);
  }

  updateLikes(isLiked, data) {
    this._likes = data.likes;
    this._likesCounter.textContent = `${data.likes.length}`;
    if (isLiked) {
      this._likeButton.classList.remove(this._selector.likeActiveClass);
    } else {
      this._likeButton.classList.add(this._selector.likeActiveClass);
    }
  }

  _setEventListeners() {
    this._cardPhoto.addEventListener(`click`, () =>
      this._handleImageClick(this._name, this._link)
    );

    this._likeButton.addEventListener(`click`, () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener(`click`, () => {
      this._handleDeleteClick(this);
    });
  }

  generate() {
    this._element = this._getElement();

    this._title = this._element.querySelector(this._selector.cardTitle);
    this._deleteButton = this._element.querySelector(
      this._selector.deleteButtonClass
    );
    this._likeButton = this._element.querySelector(
      this._selector.likeButtonClass
    );
    this._likesCounter = this._element.querySelector(
      this._selector.likesCounter
    );
    this._cardPhoto = this._element.querySelector(this._selector.cardPhoto);

    this._likesCounter.textContent = this._likes.length;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._element.dataset.id = this._id;
    this._title.textContent = this._name;

    if (this._owner._id !== this._myId) {
      this._deleteButton.remove();
    }

    if (this.isLiked()) {
      this._likeButton.classList.add(this._selector.likeActiveClass);
    }

    this._setEventListeners();
    return this._element;
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}

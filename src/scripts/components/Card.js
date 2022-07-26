import {cardTemplate, classConfig} from "../utils/constants.js"

export default class Card {
    constructor({name, link, owner, likes, _id}, myId) {
        this._name = name;
        this._link = link;
        this._owner = owner;
        this._likes = likes;
        this._id = _id;
        this._myId = myId;

    }
    
    _getElement() {
        const cardElement = cardTemplate
        .querySelector(classConfig.cardClass)
        .cloneNode(true);
        
    return cardElement;
    }

    _handleImageView(name, link) {
        //нужно решить откуда вытянуть popupImage, popupCaption
        popupImage.setAttribute(`src`, link);
        popupImage.setAttribute(`alt`, name);
        popupCaption.textContent = name;
        //импортировать функцию openPopup
        //разобраться откуда вытаскивать viewPhotoPopup
        openPopup(viewPhotoPopup);
      }

    _handleLikeClick(cardId, likeButton, likesCounter) {
        if (!likeButton.classList.contains(classConfig.likeActiveClass)) {
          giveLike(cardId)
            .then((data) => {
              likeButton.classList.add(classConfig.likeActiveClass);
              likesCounter.textContent = `${data.likes.length}`;
            })
            .catch((err) => console.log(err));
        } else {
          takeLike(cardId)
            .then((data) => {
              likeButton.classList.remove(classConfig.likeActiveClass);
              likesCounter.textContent = `${data.likes.length}`;
            })
            .catch((err) => console.log(err));
        }
      }

    _setEventListeners() {
        this._likeButton.addEventListener(`click`, () => {
            //посмотреть, нужно ли в параметрах указывать this._ пока не поняли
            this._handleLikeClick(_id, likeButton, likesCounter);
        });

        this._deleteButton.addEventListener(`click`, () => {
            //импортировать функцию openPopup
            //разобраться откуда вытаскивать confirmationPopup
            openPopup(confirmationPopup);
            confirmationPopup.dataset.id = _id;
          });
          
          //посмотреть, нужно ли в параметрах указывать this._ пока не поняли
          this._cardPhoto.addEventListener(`click`, () => handleImageView(name, link));
    }

    generate() {
        this._element = this._getElement();
        this._element = this._setEventListeners();
        
        const deleteButton = this._element.querySelector(classConfig.deleteButtonClass);
        const likeButton = this._element.querySelector(classConfig.likeButtonClass);
        const likesCounter = this._element.querySelector(classConfig.likesCounter);
        const cardPhoto = this._element.querySelector(classConfig.cardPhoto);

        likesCounter.textContent = this._likes.length;
        cardPhoto.src = this._link;
        cardPhoto.alt = this._name;
        this._element.dataset.id = this._id;
        this._element.querySelector(classConfig.cardTitle).textContent = this._name;
        
        if (this._owner._id !== this._myId) {
            deleteButton.remove();
        }

        if (this._likes.some((item) => item._id === this._myId)) {
            likeButton.classList.add(classConfig.likeActiveClass);
        }
        
        return this._element;
        }

    }





cardElement.querySelector(classConfig.cardTitle).textContent = name;

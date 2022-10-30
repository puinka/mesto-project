export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeButton = this._popup.querySelector(`.popup__close-button`);
    this._handlePopupOverlayClick = this._handlePopupOverlayClick.bind(this);
    this._handleEscKey = this._handleEscKey.bind(this);
  }

  open() {
    this._popup.classList.add(`popup_open`);
    document.addEventListener(`keydown`, this._handleEscKey);
    this._popup.addEventListener(`mousedown`, this._handlePopupOverlayClick);
  }

  close() {
    this._popup.classList.remove(`popup_open`);
    document.removeEventListener(`keydown`, this._handleEscKey);
    this._popup.removeEventListener(`mousedown`, this._handlePopupOverlayClick);
  }

  _handleEscKey(evt) {
    if (evt.key === `Escape`) {
      this.close();
    }
  }

  _handlePopupOverlayClick(evt) {
    if (evt.target.classList.contains(`popup`)) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener(`click`, () => {
      this.close();
    });
  }
}

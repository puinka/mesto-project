export default class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  // Проверить нужен ли this
  open() {
    this._selector.classList.add(`popup_open`);
    document.addEventListener(`keydown`, this._handleEscKey);
    this._selector.addEventListener(`mousedown`, this._handlePopupOverlayClick);
  }

  close() {
    this._selector.classList.remove(`popup_open`);
    document.removeEventListener(`keydown`, this._handleEscKey);
    this._selector.removeEventListener(`mousedown`, this._handlePopupOverlayClick);
  }

  _handleEscKey(evt) {
    if (evt.key === `Escape`) {
      closePopup(this._selector);
    }
  }

  _handlePopupOverlayClick() {
    if (this._selector.classList.contains(`popup_open`)) {
      closePopup(this._selector);
    }
  }
  
  // TODO
  _handlePopupCloseClick(button) {
    closePopup(this._selector);
  }
}
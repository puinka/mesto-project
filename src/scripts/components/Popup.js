export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeButton = this._popup.querySelector(`.popup__close-button`);
  }

  open() {
    this._popup.classList.add(`popup_open`);
    document.addEventListener(`keydown`, this._handleEscKey);
    this._popup.addEventListener(`mousedown`, this._handlePopupOverlayClick);
  }

  close() {
    this._popup.classList.remove(`popup_open`);
    document.removeEventListener(`keydown`, this._handleEscKey);
    this._popup.removeEventListener(
      `mousedown`,
      this._handlePopupOverlayClick
    );
  }

  _handleEscKey(evt) {
    if (evt.key === `Escape`) {
      this.close();
    }
  }

  _handlePopupOverlayClick() {
    if (this._popup.classList.contains(`popup_open`)) {
      this.close();
    }
  }

  //публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._closeButton.addEventListener(`click`, () => {
      this.close();
    });
  }
}

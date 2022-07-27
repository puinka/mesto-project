export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._closeButton = this._selector.querySelector(`.popup__close-button`);
  }

  open() {
    this._selector.classList.add(`popup_open`);
    document.addEventListener(`keydown`, this._handleEscKey);
    this._selector.addEventListener(`mousedown`, this._handlePopupOverlayClick);
  }

  close() {
    this._selector.classList.remove(`popup_open`);
    document.removeEventListener(`keydown`, this._handleEscKey);
    this._selector.removeEventListener(
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
    if (this._selector.classList.contains(`popup_open`)) {
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

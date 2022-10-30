import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation, classSelector) {
    super(popupSelector);
    this._handleConfirmation = handleConfirmation;
    this._classSelector = classSelector;
    this._form = this._popup.querySelector(this._classSelector.formClass);
    this._confirmButton = this._form.querySelector(
      this._classSelector.submitButtonClass
    );
  }

  setCardData(card) {
    this.card = card;
    this._id = card._id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this._handleConfirmation(this._id);
    });
  }
}

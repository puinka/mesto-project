import Popup from "./Popup.js";
import { classConfig } from "../utils/constants.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, handleConfirmation) {
    super(selector);
    this._handleConfirmation = handleConfirmation;
    this._form = this._popup.querySelector(classConfig.formClass);
    this._confirmButton = this._form.querySelector(
      classConfig.submitButtonClass
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

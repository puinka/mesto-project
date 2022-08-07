import Popup from "./Popup.js";
import { classConfig } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(classConfig.formClass);
    this._inputList = Array.from(
      this._form.querySelectorAll(classConfig.textInputClass)
    );
    this._submitButton = this._form.querySelector(
      classConfig.submitButtonClass
    );
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      const formValues = this._getInputValues();
      this._handleFormSubmit(formValues);
    });
  }

  showLoadingText(isLoading, defaultText = `Сохранить`) {
    isLoading
      ? (this._submitButton.textContent = `Сохранение...`)
      : (this._submitButton.textContent = defaultText);
  }
}

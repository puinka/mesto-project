import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, classSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._classSelector = classSelector;
    this._form = this._popup.querySelector(this._classSelector.formClass);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._classSelector.textInputClass)
    );
    this._submitButton = this._form.querySelector(
      this._classSelector.submitButtonClass
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

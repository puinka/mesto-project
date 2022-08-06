export default class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._selectors.textInputClass)
    );
    this._submitButton = this._form.querySelector(
      this._selectors.submitButtonClass
    );
  }

  _showInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-input-error`);
    const errorMessage = input.validationMessage;
    input.classList.add(this._selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-input-error`);
    input.classList.remove(this._selectors.inputErrorClass);
    errorElement.textContent = ``;
  }

  _validateInput(input) {
    input.validity.valid
      ? this._hideInputError(input)
      : this._showInputError(input);
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._selectors.buttonDisabledClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._selectors.buttonDisabledClass);
      this._submitButton.disabled = false;
    }
  }

  enableValidation() {
    this._submitButton.classList.add(this._selectors.buttonDisabledClass);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._validateInput(inputElement);
        this._toggleButtonState();
      });
    });
  }
}

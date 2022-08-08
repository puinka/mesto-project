import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector, name, link, popupImage, popupText) {
    super(selector);
    this._name = name;
    this._link = link;
    this._popupImage = popupImage;
    this._popupText = popupText;
  }

  open() {
    super.open();
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupText.textContent = this._name;
  }
}

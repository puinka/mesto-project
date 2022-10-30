import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector, popupImage, popupText) {
    super(selector);

    this._popupImage = popupImage;
    this._popupText = popupText;
  }

  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupText.textContent = name;
  }
}

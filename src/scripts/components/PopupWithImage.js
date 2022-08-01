import { popupImage, popupText } from "../utils/constants";
import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector, name, link) {
    super(selector);
    this._name = name;
    this._link = link;
  }

  open() {
    super.open();
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupText.textContent = this._name;
  }
}

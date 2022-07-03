function handleEscKey(evt) {
  const currentPopup = document.querySelector(`.popup_open`);
  if (evt.key === `Escape`) {
    closePopup(currentPopup);
  }
}

function handlePopupOverlayClick(evt) {
  const currentPopup = document.querySelector(`.popup_open`);
  if (evt.target.classList.contains(`popup_open`)) {
    closePopup(currentPopup);
  }
}

function openPopup(popup) {
  popup.classList.add(`popup_open`);
  document.addEventListener(`keydown`, handleEscKey);
  popup.addEventListener(`click`, handlePopupOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove(`popup_open`);
  document.removeEventListener(`keydown`, handleEscKey);
  popup.removeEventListener(`click`, handlePopupOverlayClick);
}

export { openPopup, closePopup };

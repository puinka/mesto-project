function handleEscKey(evt) {
  if (evt.key === `Escape`) {
    const currentPopup = document.querySelector(`.popup_open`);
    closePopup(currentPopup);
  }
}

function handlePopupOverlayClick(evt) {
  if (evt.target.classList.contains(`popup_open`)) {
    const currentPopup = document.querySelector(`.popup_open`);
    closePopup(currentPopup);
  }
}

function handlePopupCloseClick(button) {
  const popup = button.closest(`.popup`);
  closePopup(popup);
}

function openPopup(popup) {
  popup.classList.add(`popup_open`);
  document.addEventListener(`keydown`, handleEscKey);
  popup.addEventListener(`mousedown`, handlePopupOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove(`popup_open`);
  document.removeEventListener(`keydown`, handleEscKey);
  popup.removeEventListener(`mousedown`, handlePopupOverlayClick);
}

export { openPopup, handlePopupCloseClick };

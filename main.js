(()=>{"use strict";var e={formClass:".form",textInputClass:".form__text-input",submitButtonClass:".form__submit-button",inputErrorClass:"form__text-input_type_error",buttonDisabledClass:"form__submit-button_inactive",cardClass:".element",cardPhoto:".element__image",deleteButtonClass:".element__delete-button",likeButtonClass:".element__like-button",likeActiveClass:"element__like-button-active",likesCounter:".element__likes-amount",cardTitle:".element__title"},t={serverURL:"https://nomoreparties.co/v1/plus-cohort-12",headers:{authorization:"990d24ba-7f92-4fb3-a188-40b44340a14f","Content-Type":"application/json"}};function n(e){return e.ok?e.json():Promise.reject(e.status)}function r(e){"Escape"===e.key&&c(document.querySelector(".popup_open"))}function o(e){e.target.classList.contains("popup_open")&&c(e.target)}function a(e){e.classList.add("popup_open"),document.addEventListener("keydown",r),e.addEventListener("mousedown",o)}function c(e){e.classList.remove("popup_open"),document.removeEventListener("keydown",r),e.removeEventListener("mousedown",o)}var i=document.querySelector("#card-template").content,s=document.querySelector(".popup_type_view-photo"),u=s.querySelector(".popup__caption"),l=s.querySelector(".popup__image"),d=document.querySelector(".popup_type_confirm-removal");function f(r,o){var c=r.name,f=r.link,m=r.owner,p=r.likes,v=r._id,h=i.querySelector(e.cardClass).cloneNode(!0),y=h.querySelector(e.deleteButtonClass),_=h.querySelector(e.likeButtonClass),b=h.querySelector(e.likesCounter),C=h.querySelector(e.cardPhoto);return h.dataset.id=v,C.src=f,C.alt=c,h.querySelector(e.cardTitle).textContent=c,b.textContent=p.length,m._id!==o&&y.remove(),y.addEventListener("click",(function(){a(d),d.dataset.id=v})),p.some((function(e){return e._id===o}))&&_.classList.add(e.likeActiveClass),_.addEventListener("click",(function(){!function(r,o,a){o.classList.contains(e.likeActiveClass)?function(e){return fetch("".concat(t.serverURL,"/cards/likes/").concat(e),{method:"DELETE",headers:t.headers}).then(n)}(r).then((function(t){o.classList.remove(e.likeActiveClass),a.textContent="".concat(t.likes.length)})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(t.serverURL,"/cards/likes/").concat(e),{method:"PUT",headers:t.headers}).then(n)}(r).then((function(t){o.classList.add(e.likeActiveClass),a.textContent="".concat(t.likes.length)})).catch((function(e){return console.log(e)}))}(v,_,b)})),C.addEventListener("click",(function(){return function(e,t){l.setAttribute("src",t),l.setAttribute("alt",e),u.textContent=e,a(s)}(c,f)})),h}function m(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.buttonDisabledClass),t.disabled=!1):(t.classList.add(n.buttonDisabledClass),t.disabled=!0)}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}d.querySelector(".form__submit-button").addEventListener("click",(function(){var e,r;e=d.dataset.id,r=document.querySelector("[data-id='".concat(e,"']")),function(e){return fetch("".concat(t.serverURL,"/cards/").concat(e),{method:"DELETE",headers:t.headers}).then(n)}(e).then((function(){c(d),r.remove()})).catch((function(e){return console.log(e)}))}));var v,h,y=document.querySelector(".elements"),_=document.querySelector(".profile"),b=_.querySelector(".profile__name"),C=_.querySelector(".profile__occupation"),L=_.querySelector(".profile__avatar-image"),S=_.querySelector(".profile__edit-button"),k=_.querySelector(".profile__add-button"),E=_.querySelector(".profile__avatar-edit-button"),g=document.querySelector(".popup_type_edit-profile"),q=document.forms.editProfile,x=q.elements.userName,A=q.elements.userOccupation,T=document.querySelector(".popup_type_add-place"),D=document.forms.addPlace,U=D.elements.placeName,w=D.elements.placeLink,P=document.querySelector(".popup_type_edit-avatar"),R=document.forms.editAvatar,O=R.elements.avatarLink;S.addEventListener("click",(function(){a(g),x.value=b.textContent,A.value=C.textContent})),k.addEventListener("click",(function(){a(T)})),E.addEventListener("click",(function(){a(P)})),q.addEventListener("submit",(function(e){return function(e){e.preventDefault();var r,o,a=e.target.elements.submit;a.textContent="Сохранение...",(r=x.value,o=A.value,fetch("".concat(t.serverURL,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:r,about:o})}).then(n)).then((function(e){b.textContent=e.name,C.textContent=e.about,c(g)})).catch((function(e){return console.log(e)})).finally((function(){a.textContent="Сохранить"}))}(e)})),R.addEventListener("submit",(function(r){return function(r){r.preventDefault();var o,a=r.target.elements.submit;a.textContent="Сохранение...",(o=O.value,fetch("".concat(t.serverURL,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:o})}).then(n)).then((function(e){L.src=e.avatar,c(P)})).catch((function(e){return console.log(e)})).finally((function(){a.textContent="Сохранить",a.classList.add(e.buttonDisabledClass),a.disabled=!0,r.target.reset()}))}(r)})),D.addEventListener("submit",(function(r){return function(r,o){r.preventDefault();var a,i,s,u=r.target.elements.create;u.textContent="Сохранение...",(a={name:U.value,link:w.value},i=a.name,s=a.link,fetch("".concat(t.serverURL,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:i,link:s})}).then(n)).then((function(e){var t=f(e,o);y.prepend(t),c(T)})).catch((function(e){return console.log(e)})).finally((function(){u.textContent="Создать",u.classList.add(e.buttonDisabledClass),u.disabled=!0,r.target.reset()}))}(r,v)})),document.addEventListener("click",(function(e){e.target.classList.contains("popup__close-button")&&c(e.target.closest(".popup"))})),h=e,Array.from(document.querySelectorAll(h.formClass)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.textInputClass)),r=e.querySelector(t.submitButtonClass);m(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-input-error"));t.classList.remove(n.inputErrorClass),r.textContent=""}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-input-error"));t.classList.add(r.inputErrorClass),o.textContent=n}(e,t,t.validationMessage,n)}(e,o,t),m(n,r,t)}))}))}(e,h)})),Promise.all([fetch("".concat(t.serverURL,"/users/me"),{method:"GET",headers:t.headers}).then(n),fetch("".concat(t.serverURL,"/cards"),{method:"GET",headers:t.headers}).then(n)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);c=!0);}catch(e){i=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=r[1];v=o._id,b.textContent=o.name,C.textContent=o.about,L.src=o.avatar,function(e,t,n){e.forEach((function(e){var r=f(e,n);t.append(r)}))}(a,y,v)})).catch((function(e){return console.log(e)}))})();
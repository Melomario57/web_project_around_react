import CloseIcon from "../images/Close.png";

import React from "react";
export default function PopupWithForm({
  name,
  title,
  buttonTitle,
  isOpen,
  onClose,
  children,
}) {
  return (
    <>
      <section
        className={`popup popup_${name} ${isOpen ? "popup_opened" : ""} `}
      >
        <div className="popup__overlay"></div>
        <div className="popup__container">
          <form
            className={`form form_${name} ${
              name === "avatar-button" ? "avatar__form" : ""
            } `}
            method="dialog"
            noValidate
          >
            <button
              className="popup__button-cross"
              type="button"
              onClick={onClose}
            >
              <img src={CloseIcon} alt="imagén de una cruz" />
            </button>
            <fieldset className="popup__form-fieldset">
              <h3 className="popup__title">{title}</h3>
              {children}
              <button
                className={`popup__form-button popup__form-button_${name}`}
                type="submit"
              >
                {buttonTitle}
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}

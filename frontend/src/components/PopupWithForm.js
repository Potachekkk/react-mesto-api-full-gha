import React from "react";
import PopupEscClose from "../hooks/PopupEscClose";

function PopupWithForm({ popupData, ...props }) {
  PopupEscClose(props.isOpen, props.onClose);

  return (
    <div
      className={`popup popup_type_${popupData.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.mouseDawnClose}
    >
      <div className="popup__container">
        <button
          aria-label="Закрыть окно"
          type="button"
          className="popup__close popup__close_type_profile"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__edit">{popupData.title}</h2>
        <form
          name={popupData.name}
          onSubmit={props.onSubmit}
          className={`popup__form popup__form_type_${popupData.name}`}
        >
          {props.children}
          <button
            aria-label="Сохранить"
            type="submit"
            className="popup__button-edit popup__button-submit"
          >
            {popupData.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

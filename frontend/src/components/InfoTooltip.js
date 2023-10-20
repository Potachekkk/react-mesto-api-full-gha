import React from "react";
import success_icon from "../../src/images/success_icon.svg";
import fail_icon from "../../src/images/fail_icon.svg";
import PopupEscClose from "../hooks/PopupEscClose";

function InfoTooltip(props) {
  const { message, isOpen, onClose, mouseDawnClose } = props;
  PopupEscClose(onClose);
  return (
    <div
      className={`popup ${isOpen && "popup_opened"}`}
      onClick={mouseDawnClose}
    >
      <div className="popup__container popup__container-infotooltip">
        <img
          className="popup__icon"
          src={message.status ? success_icon : fail_icon}
          alt="Иконка успешной регистрации на сайте"
        />
        <h3 className="popup__edit popup__edit_tooltip">{message.text}</h3>
        <button
          type="button"
          aria-label="Закрыть окно"
          className="popup__close"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;

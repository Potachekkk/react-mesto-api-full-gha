import React from "react";
import PopupEscClose from "../hooks/PopupEscClose";

function ImagePopup(props) {
  const { card, onClose, mouseDawnClose } = props;
  PopupEscClose(card.link, onClose);
  return (
    <div
      className={`popup popup_type_open-image ${
        Object.keys(card).length !== 0 ? "popup_opened" : ""
      }`}
      onClick={mouseDawnClose}
    >
      <div className="popup__container-image">
        <img
          src={`${card.link}`}
          alt={`Фотография места ${card.name}`}
          className="popup__picture"
        />
        <p className="popup__figcaption">{card.name}</p>
        <button
          type="button"
          className="popup__close popup__close_type_image"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
export default ImagePopup;

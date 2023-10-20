import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirm({
  isOpen,
  onClose,
  card,
  onDeleteCard,
  mouseDawnClose,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    onDeleteCard(card);
  }
  return (
    <PopupWithForm
      popupData={{
        title: "Вы уверены?",
        name: "delete",
        buttonText: "Да",
      }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      mouseDawnClose={mouseDawnClose}
    />
  );
}

export default PopupWithConfirm;

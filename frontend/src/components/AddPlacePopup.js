import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, mouseDawnClose }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({ name, link });
  };

  React.useEffect(() => {
    if (!isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      popupData={{
        title: "Новое место",
        name: "add",
        buttonText: "Создать",
      }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      mouseDawnClose={mouseDawnClose}
    >
      <input
        name="name"
        className="popup__input popup__input_type_place"
        value={name}
        onChange={handleNameChange}
        required
        placeholder="Название"
        id="place"
        minLength="2"
        maxLength="40"
      />
      <span className="popup__error place-error"></span>
      <input
        type="url"
        name="link"
        className="popup__input popup__input_type_link"
        value={link}
        onChange={handleLinkChange}
        required
        placeholder="Ссылка на картинку"
        id="link"
      />
      <span className="popup__error link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, mouseDawnClose }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      popupData={{
        title: "Редактировать профиль",
        name: "profile",
        buttonText: "Сохранить",
      }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      mouseDawnClose={mouseDawnClose}
    >
      <input
        name="name"
        className="popup__input popup__input_type_name"
        value={name || ""}
        onChange={handleNameChange}
        required
        placeholder="Имя"
        id="name"
        minLength="2"
        maxLength="40"
      />
      <span className="popup__error name-error"></span>
      <input
        name="about"
        className="popup__input popup__input_type_about"
        value={description || ""}
        onChange={handleDescriptionChange}
        required
        placeholder="О себе"
        id="about"
        minLength="2"
        maxLength="200"
      />
      <span className="popup__error about-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

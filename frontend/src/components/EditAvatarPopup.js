import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, mouseDawnClose }) {
  const [avatar, setAvatar] = React.useState("");

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar,
    });
  }

  return (
    <PopupWithForm
      popupData={{
        title: "Обновить аватар",
        name: "avatar",
        buttonText: "Сохранить",
      }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      mouseDawnClose={mouseDawnClose}
    >
      <input
        type="url"
        name="avatar"
        value={avatar}
        onChange={handleAvatarChange}
        required
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_avatar"
        id="avatar-link"
      />
      <span className="popup__error avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = (card.owner._id || card.owner) === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  return (
    <>
      <img
        src={card.link}
        alt={`Фотография места ${card.name}`}
        className="element__image element__open-button"
        onClick={handleClick}
      />
      {isOwn && (
        <button
          type="button"
          className="element__delete-button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button
            aria-label="Поставить сердечко"
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </>
  );
}

export default Card;

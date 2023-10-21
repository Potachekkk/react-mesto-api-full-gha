import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Register from "./Register";
import Login from "./Login";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirm from "./PopupWithConfirm";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth.js";

function App() {
  const navigate = useNavigate();
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [deleteCardConfirm, setDeleteCardConfirm] = React.useState(false);
  const [deleteCard, setDeleteCard] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = useState({
    status: false,
    text: "",
  });

  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
        setEmail(email);
      })
      .catch((res) => {
        if (res === "Ошибка: 401") {
          setMessage({
            status: false,
            text: "Аккаунт не зарегистрирован",
          });
        } else {
          setMessage({
            status: false,
            text: res,
          });
        }
        setIsOpenInfoTooltip(true);
      });
  };

  const handleRegister = ({ email, password }) => {
    auth
      .register(email, password)
      .then(() => {
        setMessage({
          status: true,
          text: "Вы успешно зарегистрировались!",
        });
        navigate("/signin", { replace: true });
      })
      .catch(() => {
        setMessage({
          status: false,
          text: "Что-то пошло не так! Попробуйте еще раз.",
        });
      })
      .finally(() => {
        setIsOpenInfoTooltip(true);
      });
  };

  useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then((values) => {
          setCurrentUser(values[0]);
          setCards([...values[1]]);
        })
        .catch((err) => {
          console.log(err.status);
          alert(`Ошибка загрузки данных:\n ${err.status}\n ${err.text}`);
        });
    }
  }, [isLoggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleCardDeleteClick = (card) => {
    setDeleteCardConfirm(!deleteCardConfirm);
    setDeleteCard(card);
  };

  const handleUpdateUser = (userInfo) => {
    api
      .editUserInfo(userInfo)
      .then((value) => {
        setCurrentUser(value);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.status);
        alert(`Ошибка загрузки данных:\n ${err.status}\n ${err.text}`);
      });
  };

  const handleUpdateAvatar = (userAvatar) => {
    api
      .updateAvatar(userAvatar)
      .then((value) => {
        setCurrentUser(value);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.status);
        alert(`Ошибка загрузки данных:\n ${err.status}\n ${err.text}`);
      });
  };

  const closeAllPopups = () => {
    setIsOpenInfoTooltip(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setDeleteCardConfirm(false);
    setSelectedCard({});
  };

  function mouseDawnClose(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
    if (evt.target.classList.contains("popup__close")) {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((err) => {
        console.log(err.status);
        alert(`Ошибка лайка:\n ${err.status}\n ${err.text}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.status);
        alert(`Ошибка удаления карточки:\n ${err.status}\n ${err.text}`);
      });
  }

  function handleAddPlaceSubmit(objNewCard) {
    api
      .sendNewCard(objNewCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.status);
        alert(`Ошибка загрузки данных:\n ${err.status}\n ${err.text}`);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/signin");
    setIsLoggedIn(false);
    setEmail("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header userData={email} onSignOut={signOut} />
          <Routes>
            <Route
              path="/signup"
              element={
                <Register
                  onRegister={handleRegister}
                  setMessage={setMessage}
                  setIsOpenInfoTooltip={setIsOpenInfoTooltip}
                />
              }
            />
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  component={Main}
                  isLoggedIn={isLoggedIn}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDeleteClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                />
              }
            />
            <Route
              path="*"
              element={
                <Register
                  onRegister={handleRegister}
                  setMessage={setMessage}
                  setIsOpenInfoTooltip={setIsOpenInfoTooltip}
                />
              }
            />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            mouseDawnClose={mouseDawnClose}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            mouseDawnClose={mouseDawnClose}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            mouseDawnClose={mouseDawnClose}
          />
          <PopupWithConfirm
            onDeleteCard={handleCardDelete}
            card={deleteCard}
            isOpen={deleteCardConfirm}
            onClose={closeAllPopups}
            mouseDawnClose={mouseDawnClose}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            mouseDawnClose={mouseDawnClose}
          />
          <InfoTooltip
            isOpen={isOpenInfoTooltip}
            onClose={closeAllPopups}
            mouseDawnClose={mouseDawnClose}
            message={message}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

import React, { useState } from "react";
import { Route, Link, Routes } from "react-router-dom";
import headerLogo from "../images/main_logo.svg";

function Header({ userData, openPopupBurger, onSignOut }) {
  const [isActiveBurger, setIsActiveBurger] = useState(false);

  function openPopupBurger() {
    setIsActiveBurger(!isActiveBurger);
  }

  return (
    <header className={isActiveBurger ? "header header_type_active" : "header"}>
      <img className="header__logo" src={headerLogo} alt="Место Россия" />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to={"/sign-in"} className="header__navLink">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to={"/sign-up"} className="header__navLink">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <div
                className={
                  isActiveBurger
                    ? "header__userElements header__userElements_type_active"
                    : "header__userElements"
                }
              >
                <p className="header__email">{userData}</p>
                <button onClick={onSignOut} className="header__logout">
                  Выйти
                </button>
              </div>
              <button
                className={
                  isActiveBurger
                    ? "header__burger_active header__burger"
                    : "header__burger"
                }
                onClick={openPopupBurger}
              >
                <span className="header__burger-line"></span>
                <span className="header__burger-line"></span>
                <span className="header__burger-line"></span>
              </button>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;

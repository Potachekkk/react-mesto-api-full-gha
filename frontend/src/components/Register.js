import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password });
  };

  return (
    <main className="main">
      <div className="welcome-page">
        <h1 className="welcome-page__title">Регистрация</h1>
        <form onSubmit={handleSubmit} className="welcome-page__forms">
          <fieldset className="welcome-page__fieldset">
            <div className="welcome-page__input-wrapper">
              <input
                className="welcome-page__inputs"
                name="email"
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                placeholder="Email"
                autoComplete="on"
                required
              />
            </div>
            <div className="welcome-page__input-wrapper">
              <input
                className="welcome-page__inputs"
                name="password"
                type="password"
                placeholder="Пароль"
                autoComplete="current-password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                required
              />
            </div>
          </fieldset>
          <button type="submit" className="welcome-page__button">
            Зарегистрироваться
          </button>
        </form>
        <Link to="/signin" className="welcome-page__link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </main>
  );
}

export default Register;

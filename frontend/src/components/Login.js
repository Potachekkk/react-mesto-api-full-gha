import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <main className="main">
      <div className="welcome-page">
        <h1 className="welcome-page__title">Вход</h1>
        <form onSubmit={handleSubmit} className="welcome-page__forms">
          <fieldset className="welcome-page__fieldset">
            <div className="welcome-page__input-wrapper">
              <input
                className="welcome-page__inputs"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="on"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                required
              />
            </div>
            <div className="welcome-page__input-wrapper">
              <input
                className="welcome-page__inputs"
                name="password"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </fieldset>
          <button type="submit" className="welcome-page__button">
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;

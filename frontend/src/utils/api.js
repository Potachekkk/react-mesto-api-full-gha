export class Api {
  constructor({ url }) {
    this._url = url;
    this._checkResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }
  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  editUserInfo(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  sendNewCard(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardID) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  setLike(cardID) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  deleteLike(cardID) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  updateAvatar(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.setLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }
}

export const api = new Api({
  url: "http://localhost:3000",
});

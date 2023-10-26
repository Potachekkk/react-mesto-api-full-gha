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
        'Content-type': 'application/json',
      },
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    }).then((res) => this._checkResponse(res));
  }

  editUserInfo(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  sendNewCard(name, link) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
       body: JSON.stringify({ name, link })
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardID) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    })
    .then((res) => this._checkResponse(res));
  }

  updateAvatar(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }

changeLikeCardStatus(cardID, like) {
  const token = localStorage.getItem('jwt')
  return fetch(`${this._url}/cards/${cardID}/likes`, {
    method: like ? 'PUT' : 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-type': 'application/json'
    },
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)); 
}
}
export const api = new Api({
  url: "https://api.vladik.student.nomoredomainsrocks.ru",
});
// export const api = new Api({
//   url: "http://localhost:3000",
// });
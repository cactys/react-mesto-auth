class Api {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _checkingResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
    }).then(this._checkingResponse);
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkingResponse);
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkingResponse);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
    }).then(this._checkingResponse);
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    }).then(this._checkingResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
    }).then(this._checkingResponse);
  }

  changeLikeCardStatus(id, state) {
    return state ? this.putLike(id) : this.deletLike(id);
  }

  putLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
    }).then(this._checkingResponse);
  }

  deletLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
    }).then(this._checkingResponse);
  }

  getAllPromise() {
    return Promise.all([this.getUser(), this.getCards()]);
  }
}
export const api = new Api({
  baseUrl: 'https://api.cactys.nomoredomains.icu',
});

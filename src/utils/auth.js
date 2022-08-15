class Auth {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _checkingResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  signUp(data) {
    return fetch(`${this._url}/signup`, {
      method: `POST`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then(this._checkingResponse);
  }

  signIn(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then(this._checkingResponse);
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkingResponse);
  }

  setToken(token) {
    localStorage.setItem('jwt', token);
  }

  getToken() {
    localStorage.getItem('jwt');
  }

  removeToken() {
    localStorage.removeItem('jwt');
  }
}

const AUTH_CONFIG = {
  baseUrl: 'https://auth.nomoreparties.co',
};

const auth = new Auth(AUTH_CONFIG);

export default auth;

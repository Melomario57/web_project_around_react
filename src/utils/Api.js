class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }
  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  updateUser(name, about) {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  addCard(name, link) {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        Authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  updateAvatar(avatar) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      headers: {
        Authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  deleteCard(idCard) {
    return fetch(this._baseUrl + "/cards/" + idCard, {
      headers: {
        Authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addLike(idCard) {
    return fetch(this._baseUrl + "/cards/likes/" + idCard, {
      headers: {
        Authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  removeLike(idCard) {
    return fetch(this._baseUrl + "/cards/likes/" + idCard, {
      headers: {
        Authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

const api = new Api(
  "https://around.nomoreparties.co/v1/web_es_10",
  "aef20d41-9cb3-4569-ba79-0c7f1acf4cae"
);
export default api;

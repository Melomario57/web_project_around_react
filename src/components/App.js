import React from "react";
import { useState } from "react";
import "../index.css";

import Header from "./Header";
import Main from "./Main";

import PopupWithForm from "./PopupWithForm";

import Footer from "./Footer";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatarClick={handleEditAvatarClick}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onClose={closeAllPopups}
        selectedCard={selectedCard}
      />
      <PopupWithForm
        name={"edit-profile"}
        title={"Edital perfil"}
        buttonTitle={"Guardar"}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input
            className="popup__form-input popup__form-input-name"
            type="text"
            placeholder="Nombre"
            required
            id="name"
            name="name"
            minLength="2"
            maxLength="40"
          />
          <span className="form__error_name form__error"></span>
          <input
            className="popup__form-input popup__form-input-about"
            type="text"
            placeholder="Acerca de mi"
            required
            id="about"
            name="about"
            minLength="2"
            maxLength="200"
          />
          <span className="form__error_about form__error"></span>
        </>
      </PopupWithForm>
      <PopupWithForm
        name={"add-button"}
        title={"Nuevo lugar"}
        buttonTitle={"Crear"}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input
            className="popup__form-input popup__form-input-name"
            type="text"
            placeholder="Título"
            id="title"
            name="title"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="form__error_title form__error"></span>
          <input
            className="popup__form-input popup__form-input-about"
            type="url"
            name="link"
            placeholder="Enlace a la imagen"
            id="link"
            required
          />
          <span className="form__error_link form__error"></span>
        </>
      </PopupWithForm>
      <PopupWithForm
        form="#avatarForm "
        name={"profile-button"}
        title={"Cambiar foto de perfil"}
        buttonTitle={"Guardar"}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__form-input popup__form-input-avatar"
          type="url"
          name="avatar"
          placeholder="Ingrese el nuevo enlace"
          id="avatar"
          required
        />
        <span className="form__error_avatar form__error"></span>
      </PopupWithForm>
      <Footer />
    </div>
  );
}

export default App;

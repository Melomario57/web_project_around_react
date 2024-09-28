import React from "react";
import { useState, useEffect } from "react";
import "../index.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";

import Footer from "./Footer";
import api from "../utils/Api";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [deletedCard, setDeletedCard] = useState({});
  const [cards, setCards] = useState([]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.addLike({ id: card._id, isLiked: !isLiked }).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  };
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteCard(card) {
    setDeletedCard(card);
    setConfirmation(true);
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((error) => {
        console.error("Invalid", error);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((info) => setCurrentUser(info))
      .catch((error) => {
        console.error("Invalid", error);
      });
  }, []);

  const handleUpdateAvatar = (avatar) => {
    return api.updateAvatar(avatar).then((updateUser) => {
      setCurrentUser(updateUser);
      setIsEditAvatarPopupOpen(false);
    });
  };

  const handleUpdateUser = ({ name, about }) => {
    return api
      .updateUser({ name, about })
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        setIsEditProfilePopupOpen(false);
      })
      .catch((error) => {
        console.error("Invalid", error);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((error) => {
        console.error("Invalid", error);
      });
  };

  const handleSubmitConfirmation = (evt) => {
    evt.preventDefault();
    if (deletedCard) {
      api.deleteCard(deletedCard._id).then(() => {
        setCards((state) => state.filter((c) => c._id !== deletedCard._id));
        closeAllPopups();
      });
    }
  };

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
    setSelectedCard(false);
    setConfirmation(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onClose={closeAllPopups}
          selectedCard={selectedCard}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCard}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name={"confirmation-button"}
          title={"¿Estás seguro/a?"}
          buttonTitle={"Si"}
          content={"card"}
          buttonClass={"delete"}
          modifier={"delete"}
          isOpen={confirmation}
          onClose={closeAllPopups}
          onSubmit={handleSubmitConfirmation}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

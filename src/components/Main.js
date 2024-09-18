import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";

import EditBtn from "../images/edit.png";
import Addbtn from "../images/add.png";
export default function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  onClose,
  selectedCard,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((info) => {
        setUserName(info.name);
        setUserDescription(info.about);
        setUserAvatar(info.avatar);
      })
      .catch((invalid) => {
        console.error("invalid message", invalid);
      });
    api
      .getInitialCards()
      .then((response) => {
        setCards(response);
      })
      .catch((invalid) => {
        console.error("invalid message", invalid);
      });
  }, []);

  return (
    <>
      <section className="profile">
        <div className="profile__column">
          <div className="profile__image-wrapper">
            <img
              className="profile__image"
              src={userAvatar}
              alt="foto de perfil del usuario"
            />
            <button
              className="profile__image-switch-button"
              onClick={onEditAvatarClick}
            ></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfileClick}
            >
              <img
                src={EditBtn}
                alt="Botón para editar"
                className="profile__edit-button-image"
              />
            </button>
            <h2 className="profile__subtitle">{userDescription}</h2>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlaceClick}
        >
          <img
            src={Addbtn}
            alt="Botón para editar"
            className="profile__add-button-image"
          />
        </button>
      </section>
      {selectedCard && (
        <ImagePopup selectedCard={selectedCard} onClose={onClose} />
      )}
      <section className="cards">
        <ul className="cards__content">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                ImagePopup={selectedCard}
                onCardClick={onCardClick}
                onClose={onClose}
                key={card._id}
              ></Card>
            );
          })}
        </ul>
      </section>
    </>
  );
}

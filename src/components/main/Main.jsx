import { useEffect, useState } from "react";
import api from "../../utils/api";
import Card from "../card/Card.jsx";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfoFromServer(), api.getCardsFromServer()]).then(
      ([dataUser, dataCard]) => {
        setUserName(dataUser.name);
        setUserDescription(dataUser.about);
        setUserAvatar(dataUser.avatar);
        dataCard.forEach((element) => (element.myid = dataUser._id));
        setCards(dataCard);
      }
    );
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-overlay"
          onClick={onEditAvatar}
        >
          <img
            src={userAvatar}
            alt="изображение профиля"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <div className="profile__info-container">
            <h1 className="profile__name">{userName}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
              aria-label="Редактировать"
            />
          </div>
          <h2 className="profile__description">{userDescription}</h2>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
          aria-label="Добавить"
        />
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card, id) => (
            <Card key={id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

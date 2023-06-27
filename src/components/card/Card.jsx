import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CardLikeButton from "../card_like_button/CardLikeButton";

export default function Card({ card, onCardClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <li className="card">
      {currentUser._id === card.owner._id && (
        <button
          className="card__delite-button"
          type="button"
          onClick={() => onDelete(card._id)}
        />
      )}

      <img
        className="card__image"
        src={card.link}
        alt={`Изображение ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-group">
          <CardLikeButton
            likes={card.likes}
            myid={currentUser._id}
            cardid={card._id}
          />
        </div>
      </div>
    </li>
  );
}

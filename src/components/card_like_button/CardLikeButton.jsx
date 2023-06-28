import { useEffect, useState } from "react";

export default function CardLikeButton({ myid, card, onCardLike }) {
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setIsLike(card.likes.some((item) => myid === item._id));
  }, [card, myid]);

  return (
    <>
      <button
        className={`card__like-button ${isLike && "card__like-button_active"}`}
        type="button"
        aria-label="Поставить лайк"
        onClick={() => onCardLike(card)}
      />
      <span className="card__like-counter">{card.likes.length}</span>
    </>
  );
}

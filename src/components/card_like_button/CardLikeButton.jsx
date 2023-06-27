import { useEffect, useState } from "react";
import api from "../../utils/api.js";

export default function CardLikeButton({ likes, myid, cardid }) {
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(likes.length);

  useEffect(() => {
    setIsLike(likes.some((item) => myid === item._id));
  }, [likes, myid]);

  function handleCardLike() {
    if (isLike) {
      api
        .deleteLikeCard(cardid)
        .then((res) => {
          setIsLike(false);
          setCount(res.likes.length);
        })
        .catch((err) => console.error(`Ошибка ${err}`));
    } else {
      api
        .putLikeCard(cardid)
        .then((res) => {
          setIsLike(true);
          setCount(res.likes.length);
        })
        .catch((err) => console.error(`Ошибка ${err}`));
    }
  }

  return (
    <>
      <button
        className={`card__like-button ${isLike && "card__like-button_active"}`}
        type="button"
        aria-label="Поставить лайк"
        onClick={handleCardLike}
      />
      <span className="card__like-counter">{count}</span>
    </>
  );
}

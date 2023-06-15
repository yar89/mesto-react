export default function Card({ card, onCardClick }) {
  return (
    <li className="card">
      <button
        className="card__delite-button"
        type="button"
        aria-label="Удалить"
      />
      <img
        className="card__image"
        src={card.link}
        alt={`Изображение ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-group">
          <button
            className="card__like-button"
            type="button"
            aria-label="Поставить лайк"
          />
          <span className="card__like-counter" />
        </div>
      </div>
    </li>
  );
}

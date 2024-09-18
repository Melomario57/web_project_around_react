import TrashBtn from "../images/trash.svg";
export default function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="cards__item">
      <img
        src={card.link}
        alt={card.name}
        className="cards__image"
        onClick={handleClick}
      />
      <button className="cards__trash-button">
        <img
          src={TrashBtn}
          alt="trash picture"
          className="cards__trash-button-image"
        />
      </button>
      <div className="cards__image-info">
        <p className="cards__image-text">{card.name}</p>

        <button className="cards__hearth-button"></button>
        <span className="cards__hearth-counter"></span>
      </div>
    </li>
  );
}

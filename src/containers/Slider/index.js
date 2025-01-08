import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Trie des événements par date décroissante et verifie si il contient des éléments
  const byDateDesc = data?.focus?.length
    ? data.focus.sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
      )
    : [];

  // Changer de slide automatiquement toutes les 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearTimeout(timer); // Nettoyer le timer pour éviter les fuites mémoire
  }, [index, byDateDesc.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.id || `event-${idx}`} // Ajout unique key
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={`radio-${event.id || radioIdx}`} // Ajout nouvelle keys unique 
              type="radio"
              name="radio-button"
              checked={index === byDateDesc.indexOf(event)}
              onChange={() => setIndex(byDateDesc.indexOf(event))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

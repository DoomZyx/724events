import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const sliderIsPaused = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        setIsPaused((prevState) => !prevState);
      }
    };
    window.addEventListener("keydown", sliderIsPaused);

    return () => {
      window.removeEventListener("keydown", sliderIsPaused);
    };
  });

  // Trie des événements par date décroissante et verifie si il contient des éléments
  const byDateDesc = data?.focus?.length
  ? data.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
)
: [];

useEffect(() => {
  if (!isPaused && byDateDesc?.length > 0) {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
    }, 4000);
    
    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }
  
  // Ajout d'un retour explicite lorsque la condition n'est pas remplie
  return undefined;
}, [isPaused, byDateDesc.length]);  

  return (
    <div data-testid="SlideCardList" className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.id || `event-${idx}`}
          className={`slider ${isPaused ? "paused" : ""}`}
        >
          <div
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
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={`radio-${event.id || radioIdx}`} // Ajout nouvelle clé unique
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
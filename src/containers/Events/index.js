import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

 // Trie des événements par date 
  const trieEvents = data?.events.sort((a, b) => new Date(a.date) - new Date(b.date)) || [];

  // Filtre les événements selon leur type et prend en compte la date et affiche tous les événements de leur type si type est nul 
  const filteredEvents = (
    (!type
      ? trieEvents
      : trieEvents.filter((event) => event.type === type)) || []
  ).filter((_events, index) => {
    if (
      // Affiche 9 évenements en fonction de la page actuelle 
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };


  // Calcule le nb total d'événements en fonction du type et de la date 

  const totalEvents =
    trieEvents.filter((event) => (type ? event.type === type : true))
      .length || 0;

      // Se base sur le résultat de totalEevents pour calculer le nombre de pages 
  const pageNumber = Math.ceil(totalEvents / PER_PAGE);

  // conversion de la liste des types en tableau 
  const typeList = Array.from(new Set(trieEvents.map((event) => event.type)));




  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={typeList}
            onChange={(value) => changeType(value)}
            titleEmpty={false}
            label="Type d'événement"
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination"> 
            {/* Utilisation de Arrayfrom  */}
            {Array.from({ length: pageNumber }, (_, n) => (
             <a
                key={`page-${n + 1}`}
                href="#events"
                onClick={() => setCurrentPage(n + 1)}
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
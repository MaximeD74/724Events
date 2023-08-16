import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [sortedEvents, setSortedEvents] = useState([]);
  const [activeBullet, setActiveBullet] = useState(0);

  useEffect(() => {
    if (data?.focus) {
      const sortedDataWithIds = data.focus.map((event, idx) => ({
        ...event,
        id: idx,
      })).sort((evtA, evtB) => new Date(evtA.date) - new Date(evtB.date));
  
      setSortedEvents(sortedDataWithIds);
    }
  }, [data]);

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1 < sortedEvents.length ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    const timeout = setTimeout(nextCard, 5000);
    setActiveBullet(index);
    return () => clearTimeout(timeout);
  }, [index, sortedEvents]);

  return (
    <div className="SlideCardList">
      {sortedEvents.map((event, idx) => (
        <div
          key={event.id}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              {index === idx && <div>{getMonth(new Date(event.date))}</div>}
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {sortedEvents.map((_, bulletIdx) => (
            <input
              key={`pagination-${sortedEvents[bulletIdx].id}`}
              type="radio"
              name="radio-button"
              checked={activeBullet === bulletIdx}
              onChange={() => {
                setActiveBullet(bulletIdx);
                setIndex(bulletIdx);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
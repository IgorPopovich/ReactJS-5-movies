import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import Loader from "../Loader/Loader";
import css from './Cast.module.css';

function Cast({movieId}) {
  const [items, setItems] = useState([]);
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    setShowLoader(true)
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=d3f7b1c0656b5d6ae1aec003a1724af6&language=en-US`)
    .then(response => response.json())
    .then(data => {
      setItems(data.cast)
    })
    setShowLoader(false)
  }, [movieId]);

  return (
        <div className={css.cast}>
          {showLoader && <Loader />}
          {items.length > 0 && <ul className={css.castList}>
            {items.map(( item, index ) => (
              <li className={css.castItem} key={index}>
                {item.profile_path && <img className={css.profile_path} src={`https://image.tmdb.org/t/p/w200${item.profile_path}`} alt={item.name}></img>}
                <p className={css.name}>{item.name}</p>
                <p className={css.character}>{`Character: ${item.character}`}</p>
              </li>
            ))}
          </ul>}
        </div>
  );
}

Cast.propTypes = {
  movieId: PropTypes.number,
  showLoader: PropTypes.bool,
  items: PropTypes.array,
};

export default Cast;
import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import Loader from "../Loader/Loader";
import css from "./Reviews.module.css";

const Reviews = ({movieId}) => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('')

  useEffect(() => {
    setStatus('pending')
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=d3f7b1c0656b5d6ae1aec003a1724af6&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => {
      setItems(data.results)
      if (data.results.length < 1) {
        setStatus('none')
      }
    })
    setStatus('result')
  }, [movieId]);

  if (status === 'pending') {
    return <Loader />
  }

  if (status === 'result') {
      return <div className={css.reviews}>
          <ul className={css.reviewsList}>
            {items.map(( item, index ) => (
              <li className='' key={index}>
                <p className={css.autor}>{`Author: ${item.author}`}</p>
                <p className={css.content}>{item.content}</p>
              </li>
            ))}
          </ul>
      </div>
  }

  if (status === 'none') {
    return <p className={css.reviewIsEmpty}>We don`t have any reviews for this movie</p>
  }
  
}

Reviews.propTypes = {
  movieId: PropTypes.number,
  status: PropTypes.string,
  items: PropTypes.array,
};

export default Reviews
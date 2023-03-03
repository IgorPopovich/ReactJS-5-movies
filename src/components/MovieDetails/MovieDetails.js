import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import { Link, Outlet } from "react-router-dom";
import Loader from "../Loader/Loader";
import css from "./MovieDetails.module.css";

const MovieDetails = ({movieId, activeItem}) => {
  const [item, setItem] = useState({});
  const [itemGenres, setItemGenres] = useState([]);
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    setShowLoader(true)
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=d3f7b1c0656b5d6ae1aec003a1724af6&language=en-US`)
    .then(response => response.json())
    .then(data => {
      setItem(data)
      setItemGenres(data.genres)
    })
    setShowLoader(false)
  }, [movieId]);

  const date = item.release_date
  const correctDate = date ? date.slice(0, 4) : ''


  return (
      <div>
        {showLoader && <Loader />}
        {!showLoader && <Link to={activeItem} className={css.goBack}>Go back</Link>}
        {!showLoader && <div className={css.container}>
          {item !== {} ? <div className={css.movieDetails}>
            <div>
              <img className={css.filmPoster} src={item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : ''} alt={item.title}></img>
            </div>
            <div className={css.descriprion}> 
              <p className={css.filmName}>{item.length > 0 ? `${item.title} (${correctDate})` : ''}</p>
              <p className={css.descriptionText}>User Scope: 71% </p>
              <p className={css.descriptionTitle}>Overview</p>
              <p className={css.descriptionText}>{item.overview ? `${item.overview}` : ''}</p>
              <p className={css.descriptionTitle}>Genres</p>
              {itemGenres && <ul className={css.itemsGenres}>
                {itemGenres.map(( item, index ) => (
                  <li className={css.filmGenresItem} key={index}>{item.name}</li>
                ))}
              </ul>}
            </div>
          </div> : <Loader />}
          <div className={css.additatinal}>
            <p className={css.additatinalTitle}>Additatinal information</p>
            <ul className={css.additatinalMenu}>
              <li><Link className={css.additatinalLink} to={`/movies/:${movieId}/cast`}>Cast</Link></li>
              <li><Link className={css.additatinalLink} to={`/movies/:${movieId}/reviews`}>Reviews</Link></li>
            </ul>
          </div>
          <div>
            <Outlet />
          </div>
        </div>}
      </div>
  )
}

MovieDetails.propTypes = {
  movieId: PropTypes.number,
  activeItem: PropTypes.string,
  item: PropTypes.object,
  itemGenres: PropTypes.array,
  showLoader: PropTypes.bool,
};

export default MovieDetails;

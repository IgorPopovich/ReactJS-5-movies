import Loader from 'components/Loader/Loader';
import s from './MovieDetailsPage.module.css';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchMoviesDetails } from 'services/api';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getYear = () => new Date(movie.release_date).getFullYear();

  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  let activeClassName = {
    color: '#2196f3',
  };

  const handleClick = () => navigate(location?.state?.from ?? '/');

  useEffect(() => {
    setLoading(true);
    fetchMoviesDetails(movieId)
      .then(res => {
        setMovie(res);
      })
      .catch(error => {
        setError('Ooops. Something went wrong...');
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div className={s.details}>
        <button onClick={handleClick} className={s.backButton}>
          Go back
        </button>

        {loading && <Loader />}
        {error && <div>{error}</div>}
        {movie && (
          <div className={s.details_container}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={s.details_right}>
              <h3>{movie.title}</h3>
              <p>({getYear()})</p>
              <p>User Score: {movie.popularity}</p>
              <div className={s.movie_overview}>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
        )}
        <hr />
        <div>
          <h2>Additional Information</h2>
          <NavLink
            to={`/movies/${movieId}/reviews`}
            style={({ isActive }) => (isActive ? activeClassName : undefined)}
            state={location.state}
          >
            <p className={s.button}>Reviews</p>
          </NavLink>

          <NavLink
            to={`/movies/${movieId}/cast`}
            style={({ isActive }) => (isActive ? activeClassName : undefined)}
            state={location.state}
          >
            <p className={s.button}>Cast</p>
          </NavLink>
          <hr />
          <Outlet />
        </div>
    </div>
  );
}

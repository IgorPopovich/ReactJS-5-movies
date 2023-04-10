import { useState, useEffect } from 'react';
import s from './Movies.module.css';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import SearchBar from 'components/SearchBar/SearchBar';
import { fetchByQuery } from 'services/api';
import Loader from 'components/Loader/Loader';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const searchRequest = searchParams.get('query');

  useEffect(() => {
    if (!searchRequest) {
      return;
    }
    const fetchMovie = () => {
      setLoading(true);
      fetchByQuery(searchRequest)
        .then(results => {
          if (!results.length) {
            alert('No movies found!');
          }

          setMovies(results);
        })
        .catch(error => {
          setError('Ooops. Something went wrong...');
          console.log(error);
        })
        .finally(setLoading(false));
    };
    fetchMovie();
  }, [searchRequest]);

  // onSubmit
  function onSubmit(value) {
    setSearchParams({ query: `${value}` });
  }

  return (
    <div className={s.movies}>
        <h3>Movies search</h3>
        {loading && <Loader />}
        {error && <div>{error}</div>}

        <SearchBar onSearch={onSubmit} />
        {movies &&               
              <div>
                <ul>
                  {movies.map(({ id, original_title }) => (
                    <li key={id}>
                      <Link className={s.item} to={`/movies/${id}`} state={{ from: location }}>
                        {original_title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
          }
    </div>
  );
};

export default MoviesPage;

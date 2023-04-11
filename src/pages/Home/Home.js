import Loader from 'components/Loader/Loader';
import s from './Home.module.css';
import { useEffect, useState } from 'react';
import { getMovies } from 'services/api';
import MovieList from 'components/MovieList/MovieList';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = () => {
      setLoading(true);
      getMovies()
        .then(results => setMovies(results))
        .catch(error => {
          setError('Ooops. Something went wrong...');
          console.log(error);
        })
        .finally(() => setLoading(false));
    };
    fetchTrendingMovies();
  }, []);

  const isNotFound = !loading && !movies.length;
  return (
    <div className={s.home}>
        <h3>Home</h3>
        {loading && <Loader />}
        {isNotFound && <h1>Не найдено!!!</h1>}
        {error && <div>{error}</div>}
        {movies &&  <MovieList movies={movies} />}
    </div>
  );
}

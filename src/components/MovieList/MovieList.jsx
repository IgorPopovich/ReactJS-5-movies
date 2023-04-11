import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movies, prevLocation }) => {

  return (
    <>
      <ul>
        {movies.map(({ id, title, name }) => (
          <li key={id}>
            <Link className={s.item} to={`/movies/${id}`} state={{ from: prevLocation }}>
              {title ? title : name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};
export default MovieList;

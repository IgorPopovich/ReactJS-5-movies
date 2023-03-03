import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import '../App.css';
import css from "./Movies.module.css";

const Movies = ({ getId, itemsSet, itemsArr }) => {
  const [query, setQuery] = useState('');
  const [showLoader, setShowLoader] = useState(false)
  const [items, setItems] = useState([])

  const handleNameChange = (event) => setQuery(event.currentTarget.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (query.trim() === '') {
      alert('Введите название...')
      return;
    }
    setItems([])
    setShowLoader(true)
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=d3f7b1c0656b5d6ae1aec003a1724af6&query=${query}&language=en-US&page=1&include_adult=false`)
    .then(response => response.json())
      .then(data => {
        itemsSet(data.results)
      })
      setShowLoader(false)
      setQuery('')
  }

  const updateId = (name) => {
    getId(name)
  }

  useEffect(() => {
    setItems(itemsArr)
  }, [itemsArr]);
  
  return (
    <div className='container'>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input className={css.searchFormInput}
          onChange={handleNameChange}
          value={query}
          type="text" name="query" 
          placeholder="Search movies..."
        />

        <button
          type="submit" 
          className={css.searchFormButton}>
          Search
        </button>
      </form>

      {showLoader && <Loader />}
      <ul className={css.items}>
            {items.length > 0 && items.map(( item, index ) => (
              <Link onClick={() => updateId(item.id)} to={`/movies/:${item.id}`} className={css.item} key={index}>
                {item.title}
              </Link>
            ))}
      </ul>
    </div>
  )
}

Movies.propTypes = {
  getId: PropTypes.func,
  itemsSet: PropTypes.func,
  itemsArr: PropTypes.array,
  query: PropTypes.string,
  showLoader: PropTypes.bool,
  items: PropTypes.array,
};

export default Movies;

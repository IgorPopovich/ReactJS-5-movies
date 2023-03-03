import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import css from './Home.module.css';

const Home = ({ getId }) => {
  const [items, setItems] = useState([])
  const [showLoader, setShowLoader] = useState(false)

    useEffect(() => {
      setShowLoader(true)
      fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=d3f7b1c0656b5d6ae1aec003a1724af6`)
      .then(response => response.json())
      .then(data => {
        setItems(data.results)
      })
      setShowLoader(false)
    });

  const updateId = (name) => {
    getId(name)
  }

  return (
    <div className={css.container}>
      <ul className={css.items}>
        {showLoader && <Loader />}
            {items.length > 0 && items.map(( item, index ) => (
              <Link onClick={() => updateId(item.id)} to={`/movies/:${item.id}`} className={css.item} key={index}>
                {item.title}
              </Link>
            ))}
      </ul>
    </div>
  )
}

Home.propTypes = {
  getId: PropTypes.func,
  showLoader: PropTypes.bool,
  items: PropTypes.array,
};

export default Home;

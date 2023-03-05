import PropTypes from 'prop-types';
import './App.css';
import React, {useState, useEffect } from 'react';
import Movies from './Movies/Movies';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from './Home/Home';
import Header from './Header/Header';
import MovieDetails from './MovieDetails/MovieDetails';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';

function App() {
  const location = useLocation();
  const navigate = useNavigate()
  const [idItem, setIdItem] = useState(0);
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState('/');

  const updateId = (name) => {
    setIdItem(name)
  }

  useEffect(() => {
    if (location.pathname === '/ReactJS-5-movies') {
      navigate('/')
    }
  }, [location, navigate]);

  return (
      <div>
        <Header activeItem={activeItem} clickActive={setActiveItem} setHome={setItems} />
        <Routes>
          <Route index element={<Home getId={updateId} />} />
          <Route path='movies' element={<Movies itemsArr={items} itemsSet={setItems} getId={updateId} />} />
          <Route path={`/movies/:${idItem}`} element={<MovieDetails arr={activeItem} activeItem={activeItem} movieId={idItem} />}>
            <Route path="cast" element={<Cast movieId={idItem} />} />
            <Route path="reviews" element={<Reviews movieId={idItem} />} />
          </Route>
          <Route path="*" element={<p>Path not resolved</p>} />
        </Routes>
      </div>
  );
}

App.propTypes = {
  idItem: PropTypes.number,
  activeItem: PropTypes.string,
  items: PropTypes.array,
};

export default App;

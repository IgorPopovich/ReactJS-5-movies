import PropTypes from 'prop-types';
import './App.css';
import React, {useState} from 'react';
import Movies from './Movies/Movies';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home/Home';
import Header from './Header/Header';
import MovieDetails from './MovieDetails/MovieDetails';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';

function App() {
  const [idItem, setIdItem] = useState(0);
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState('/');


  const updateId = (name) => {
    setIdItem(name)
  }

  return (
    <BrowserRouter>
      <Header activeItem={activeItem} clickActive={setActiveItem} setHome={setItems} />
      <Routes>
        <Route index element={<Home getId={updateId} />} />
        <Route path='movies' element={<Movies itemsArr={items} itemsSet={setItems} getId={updateId} />} />
        <Route path={`/movies/:${idItem}`} element={<MovieDetails arr={activeItem} activeItem={activeItem} movieId={idItem} />}>
          <Route path="cast" element={<Cast movieId={idItem} />} />
          <Route path="reviews" element={<Reviews movieId={idItem} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

App.propTypes = {
  idItem: PropTypes.number,
  activeItem: PropTypes.string,
  items: PropTypes.array,
};

export default App;

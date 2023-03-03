import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import React, {useEffect} from 'react';
import css from './Header.module.css';

function Header({clickActive, setHome, activeItem}) {

  const handleActiveHome = () => {
    clickActive('/')
  };

  const handleActiveMovies = () => {
    clickActive('/movies')
    setHome([])
  };

  useEffect(() => {
   if (activeItem === '/') {
    clickActive('/')
   }
   //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickActive]);

  return (
        <div className={css.menu}>
          <Link onClick={handleActiveHome} className={activeItem === '/' ? `${css.activeClassName} ${css.link}` : `${css.link}`} to='/'>Home</Link>
          <Link onClick={handleActiveMovies} className={activeItem === '/movies' ? `${css.activeClassName} ${css.link}` : `${css.link}`} to='/movies'>Movies</Link>
        </div>
  );
}

Header.propTypes = {
  clickActive: PropTypes.func,
  activeItem: PropTypes.string,
  setHome: PropTypes.func,
};

export default Header;


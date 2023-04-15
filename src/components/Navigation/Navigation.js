import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

let activeClassName = {
  color: '#f32121',
  fontWeight: 'bold'
};

const Navigation = () => (
  <div className={s.navigation}>
    <NavLink
      to="/"
      className={s.link}
      style={({ isActive }) => (isActive ? activeClassName : undefined)}
    >
      Home
    </NavLink>

    <NavLink
      to="/movies"
      className={s.link}
      style={({ isActive }) => (isActive ? activeClassName : undefined)}
    >
      Movies
    </NavLink>
  </div>
);

export default Navigation;

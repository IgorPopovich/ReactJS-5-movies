import s from './Header.module.css';
import Navigation from 'components/Navigation/Navigation';

export default function Header() {
  return (
    <header className={s.header}>
        <Navigation />
    </header>
  );
}

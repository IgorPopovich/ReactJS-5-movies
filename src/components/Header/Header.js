import s from './Header.module.css';
import Navigation from 'components/Navigation/Navigation';
import { Suspense } from 'react';
import Loader from '../Loader/Loader';
import { Outlet } from 'react-router-dom';

export default function Header() {
  return (
    <header className={s.header}>
        <Navigation />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
    </header>
  );
}

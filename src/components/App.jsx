import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Header from './Header/Header';

const Home = lazy(() =>import('../pages/Home/Home'));

const MoviesPage = lazy(() => import('../pages/Movies/Movies'));

const MovieDetailsPage = lazy(() =>import('../pages/MovieDetailsPage/MovieDetailsPage'));

const Reviews = lazy(() => import('../pages/Reviews/Reviews'));
const Cast = lazy(() => import('../pages/Cast/Cast'));

export const App = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
    </>
  );
};


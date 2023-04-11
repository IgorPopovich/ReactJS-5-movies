import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './Header/Header';
import Loader from './Loader/Loader';

const Home = lazy(() =>import('../pages/Home/Home'));

const MoviesPage = lazy(() => import('../pages/Movies/Movies'));

const MovieDetailsPage = lazy(() =>import('../pages/MovieDetailsPage/MovieDetailsPage'));

const Reviews = lazy(() => import('../pages/Reviews/Reviews'));
const Cast = lazy(() => import('../pages/Cast/Cast'));

export const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/movies/:movieId/" element={<MovieDetailsPage />}>
            <Route path="reviews" element={<Reviews />} />
            <Route path="cast" element={<Cast />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
};


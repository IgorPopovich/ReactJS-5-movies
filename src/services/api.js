import axios from 'axios';

const API_KEY = 'd3f7b1c0656b5d6ae1aec003a1724af6';

export const getMovies = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
  );
  return res.data.results;
};

export const fetchByQuery = async (query) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=1&query=${query}&language=en-US&include_adult=false`
  );
  return res.data.results;
};

export const fetchMoviesDetails = async id => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  return res.data;
};

export const fetchMoviesCredits = async id => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
  return res.data.cast;
};

export const fetchMoviesReviews = async (id) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
  return res.data.results;
};

import axios from 'axios';

const API_KEY = 'd3f7b1c0656b5d6ae1aec003a1724af6';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const getMovies = async () => {
  const res = await axios.get(
    `/trending/all/day?api_key=${API_KEY}`
  );
  return res.data.results;
};

export const fetchByQuery = async (query) => {
  const res = await axios.get(
    `/search/movie?api_key=${API_KEY}&page=1&query=${query}&language=en-US&include_adult=false`
  );
  return res.data.results;
};

export const fetchMoviesDetails = async id => {
  const res = await axios.get(
    `/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  return res.data;
};

export const fetchMoviesCredits = async id => {
  const res = await axios.get(
    `/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
  return res.data.cast;
};

export const fetchMoviesReviews = async (id) => {
  const res = await axios.get(
    `/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
  return res.data.results;
};

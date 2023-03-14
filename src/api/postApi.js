import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '59b71b0d016897afbcdce7c94929ab1d';

//trending
export const getTrendingMovies = async () => {
  const { data } = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);
  return data.results;
};

// details
export const getMovieById = async movieId => {
  const res = await axios.get(`/movie/${movieId}?api_key=${API_KEY}`)
    .catch(error => {throw new Error('Error.Page is not found.');
    });
  return res.data;
};

//cast 
export const getCredits = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );
  return data.cast;
};

//reviews
export const getReviews = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/reviews?api_key=${API_KEY}`);
  return data.results;
};

// search
export const getMoviesByName = async query => {
  const { data } = await axios.get(`/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
  ); return data;
};
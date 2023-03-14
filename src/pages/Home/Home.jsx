import { useEffect, useState } from "react";
import { getTrendingMovies } from "api/postApi";
import MovieList from 'components/MovieList/MovieList';
import s from '../Home/Home.module.css'

export const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const trendingMovies = await getTrendingMovies();
        setTrendingMovies(trendingMovies);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={s.home}>
      <h1>Trending today</h1>
      <MovieList trending={trendingMovies} loading={isLoading} />
    </div>
  );
};

export default Home;
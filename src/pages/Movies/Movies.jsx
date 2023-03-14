import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMoviesByName } from "api/postApi";
import s from '../Movies/Movies.module.css'

export const Movies = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const fullPath = location.pathname + location.search;
  const movieName = searchParams.get('query');  
  
  const handleSubmit = evt => {
    evt.preventDefault();
    const query = evt.target.movie.value;
    if (!query) {
      toast('Movie name...', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    }
    setSearchParams(query !== '' ? { query } : {});
  };

  useEffect(() => {
    const fetchdata = async () => {
      if (!movieName) {
        return;
      }
      setIsLoading(true);
      try {
        const movies = await getMoviesByName(movieName);
        setPosts(movies.results);
      } catch (evt) {
        console.log(evt);
      } finally {
        setIsLoading(false);
      }
    };
    fetchdata();
  }, [movieName]);

  return (
    <div className={s.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="movie"
          placeholder="Enter the movie..."
          autoComplete="off"
          defaultValue={movieName}
        />
        <button type="submit" variant="outlined">
          Search
        </button>
      </form>        
      <>
        {isLoading && <p>Loading...</p>}
        {movieName && (
          <ul>
            {posts.map(({ id, title, name }) => (
              <li key={id}>
                <Link to={`${id}`} state={{ from: fullPath }}>
                  {title || name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>     
    </div>
  );
};

export default Movies;
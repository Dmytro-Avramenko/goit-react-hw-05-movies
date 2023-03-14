import { useEffect, useState, Suspense } from 'react';
import { Outlet, useParams, useLocation, useNavigate, Link } from 'react-router-dom';

import { getMovieById } from "api/postApi";
import ErrorImage from '../../images/image.png';
// import { PAGE_NAMES } from "router/paths";
import s from '../MovieDetails/MovieDetails.module.css';

const IMAGEURL = 'https://image.tmdb.org/t/p/w500/';

export const MovieDetails = () => {
  const { movieId } = useParams();  
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
    
    useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const movieData = await getMovieById(movieId);
        setMovie(movieData);
      } catch (evt) {
        // console.log(evt);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  const handleGoBackButton = () => {
    navigate(location.state.from);
  };
  if (!movie) {
    return;
  }
  const { genres, title, release_date, overview, vote_average, poster_path } =
    movie;
  const imageSRC = poster_path ? IMAGEURL + poster_path : ErrorImage;
  const userScore = Math.round((Number(vote_average) * 100) / 10);
  const movieGenres = genres.map(genre => genre.name).join(' ');
  const releaseDate = release_date.slice(0, 4);

  return (
    <>
      <div className={s.movie_details}>
        {location.state?.from && (
            <button className={s.movie_details}
                onClick={handleGoBackButton}><span>←Go back</span>
            </button>
        )}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div><img src={`${imageSRC}`} alt={title} /></div>
            <>
              <h2>{title} {releaseDate && `(${releaseDate})`}</h2>
              <ul>
                <li>{userScore > 0 && <p>User Score: {userScore}%</p>}</li>
                <> 
                <b>Overview</b>
                  <p>{overview}</p>
                </>
                <><b>Genres</b>
                  <p>{movieGenres ?? ' - '}</p>
                </>
              </ul>
            </>
          </div>
        )}
      </div>
      <div>
        <h3> Additional information</h3>
        <div>
          <ul>
            <li>
              <Link to="cast" state={location.state}>
                Cast
              </Link>
            </li>

            <li>
              <Link to="reviews" state={location.state}>
                Reviews
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
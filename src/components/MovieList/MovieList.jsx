import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieList = ({ trending, loading }) => {
  const location = useLocation();
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
          
        <ul>
          {trending.map(({ id, title, name }) => (
            <li key={id}>
              <Link to={`movies/${id}`}
                state={{ from: location.pathname }}
              >
                {title ?? name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

MovieList.propTypes = {
  trending: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};

export default MovieList;
import { Link } from "react-router-dom";
// import { PAGE_NAMES } from "router/paths";

export const NotFound = () => {
  return (
    <>
      <h2>404 not found is a HTTP status code error</h2>
      
      <ul>
        <li>
          <button>
            <Link to="/">Home</Link>
          </button>
        </li>

        <li>
          <button>
            <Link to="/movies">Movies</Link>{' '}
          </button>          
        </li>
      </ul>            
    </>
  );
};

export default NotFound;
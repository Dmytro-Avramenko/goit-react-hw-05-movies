import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCredits } from 'api/postApi';
import profileError from '../../images/profile.png';

const IMAGEURL = 'https://image.tmdb.org/t/p/w500';

const Cast = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const cast = await getCredits(movieId);
        setCast(cast);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId]);
  if (!cast) {
    return;
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {cast.map(({ id, profile_path, name, character }) => {
            const imageSRC = profile_path
              ? IMAGEURL + profile_path
              : profileError;
            return (
              <li key={id}>
                <img src={imageSRC} alt={name} width={200} height={300} />
                <div>
                  <p><span>{name}</span></p>
                  {character ? (
                  <p><b>Character:</b><span> {character}</span>
                    </p>
                  ) : (
                    <p><b>Character:</b><span>Unknown</span>
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {!cast.length && (
        <p>No information about film...</p>
      )}
    </div>
  );
};

export default Cast;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from 'api/postApi';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getReviews(movieId);
        setReviews(data);
      } catch (evt) {
        console.log(evt, 'Error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {reviews.length > 0 &&
            reviews.map(({ id, author, content }) => (
              <div key={id}>
                <p><b>Author: {author}</b></p>
                <p>"{content}"</p>
              </div>
              
            ))}
        </div>
      )}
      {!reviews.length && <p>There are no reviews.</p>}
    </div>
  );
};

export default Reviews;
// Carousel.js
import React, { useEffect, useState } from 'react';
import { mainAxiosInstance } from '../api/axiosInstances'
import { useSelector } from 'react-redux';
const Test = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [start, setStart] = useState(0);
    const user = useSelector((state) => state.user);
    const { userInfo } = user;
  useEffect(() => {
    fetchRecommendations();
  }, [start]);

  const fetchRecommendations = async () => {
    try {
      const response = await mainAxiosInstance.get(`/api/recommendations/${userInfo.id}/`, {
        params: {
          start: start,
          limit: 4,
        },
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations', error);
    }
  };

  const handleNext = () => {
    setStart(start + 4);
  };

  const handlePrev = () => {
    setStart(Math.max(0, start - 4));
  };

  return (
    <div>
      <h2>Recommendations</h2>
      <div className="carousel">
        {recommendations.map((rec) => (
          <div key={rec.id} className="carousel-item">
            <p>{rec.recommended_content_id}</p>
            <p>Score: {rec.score}</p>
          </div>
        ))}
      </div>
      <button onClick={handlePrev} disabled={start === 0}>
        Previous
      </button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Test;

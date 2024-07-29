import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const BookRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
 
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} style={{ color: index + 1 <= rating ? 'gold' : 'gold' }}>
      {index + 1 <= fullStars ? <StarIcon /> : null}
      {hasHalfStar && index + 1 === Math.ceil(rating) ? <StarHalfIcon /> : null}
    </span>
  ));
 
  return <div>{stars}</div>;
  };

export default BookRating;
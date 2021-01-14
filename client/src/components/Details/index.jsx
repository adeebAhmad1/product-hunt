import React from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

const Details = () => {
  const { id } = useParams()
  return (
    <div>
      <Comments id={id} />
    </div>
  );
};

export default Details;
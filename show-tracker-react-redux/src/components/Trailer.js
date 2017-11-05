import React from 'react';

const Trailer = (props) => {
  return (
    <iframe width="315" height="200" src={props.trailerUrl} frameborder="0" allowfullscreen></iframe>
  )
}

export default Trailer;

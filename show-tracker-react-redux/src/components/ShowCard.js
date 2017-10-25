import React from 'react';

const MoviesAbout = props =>
  <div className="well">
    <img src={props.posterUrl} />
    <h2>{props.title}</h2><h4>{props.year}</h4>
    <button>Add to My Shows</button>
  </div>;

export default MoviesAbout

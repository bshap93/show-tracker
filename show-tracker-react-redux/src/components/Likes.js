import React from 'react';

const Likes = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>Like</button>
      <button onClick={props.callApi}>Call Api</button>
      <p>{props.likes} Likes!</p>
    </div>
  )
}

export default Likes;

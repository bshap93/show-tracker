import React from 'react';

const AddToMyShowsButton = (props) => {
  return (
    <button onClick={handleOnClick(props.show)}>Add to My Shows</button>
  )
}

function handleOnClick(show) {

}

export default AddToMyShowsButton

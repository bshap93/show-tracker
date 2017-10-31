import React from 'react';
import fetch from 'isomorphic-fetch'

class AddToMyShowsButton extends React.Component {

  handleOnClick = (event) => {
    event.preventDefault();
    var keyId = this.props.key;
    var showData = this.props.show;

    fetch('/api/v1/my_shows', {
      credentials: "same-origin",
      mode: 'cors',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        id: keyId,
      })
    })
      .then((response) => {console.log("Post Session Response: ", response)})
      .catch((error) => {console.log("Error in the Post Session fetch: ", error)})
  }

  render() {
    return (
      <button onClick={this.handleOnClick}>Add to My Shows</button>
    )
  }
}



export default AddToMyShowsButton

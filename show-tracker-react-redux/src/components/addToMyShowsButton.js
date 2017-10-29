import React from 'react';
import fetch from 'isomorphic-fetch'

class AddToMyShowsButton extends React.Component {
  handleOnClick = () => {
    var keyId = this.props.key;
    var showData = this.props.show;

    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     my_show: {
    //       id: keyId,
    //     }
    //   })
    // }
    //
    // fetch('api/v1/my_shows', options)
    //   .then(response => response.json())
    //   .then(json => console.log(json))
  }

  render() {
    return (
      <button onClick={this.handleOnClick}>Add to My Shows</button>
    )
  }
}



export default AddToMyShowsButton

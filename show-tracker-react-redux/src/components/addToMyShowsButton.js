import React from 'react';

class AddToMyShowsButton extends React.Component {
  handleOnClick = () => {
    var keyId = this.props.key;
    var showData = this.props.show;

    fetch("/api/v1/my_shows", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: keyId
      })
    }).then(resp => console.log(resp))
  }

  render() {
    return (
      <button onClick={this.handleOnClick}>Add to My Shows</button>
    )
  }
}



export default AddToMyShowsButton

import React from 'react';
import fetch from 'isomorphic-fetch'
import MyShowService from '../services/MyShowService'

class AddToMyShowsButton extends React.Component {

  handleOnClick = (event) => {
    event.preventDefault();
    var showData = this.props.data;
    var keyId = showData.ids.trakt;
    var myShow = {
      id: keyId
    }

    MyShowService.createMyShow(myShow).then(myShow => console.log("Created Show: ", myShow))

  }

  render() {
    return (
      <button onClick={this.handleOnClick}>Add to My Shows</button>
    )
  }
}



export default AddToMyShowsButton

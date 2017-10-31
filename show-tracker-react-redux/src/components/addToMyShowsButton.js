import React from 'react';
import fetch from 'isomorphic-fetch'
import MyShowService from '../services/MyShowService'

class AddToMyShowsButton extends React.Component {

  handleOnSubmit = (event) => {
    event.preventDefault();
    var showData = this.props.data;
    var keyId = showData.ids.trakt;
    const myShow = {
      title: "KSS"
    }

    MyShowService.createMyShow(myShow).then(myShow => console.log("Created Show: ", myShow))

  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input
          type="hidden"
          name="title"
          value={this.props.data.title}
        />

        <button>Add to My Shows</button>
      </form>

    )
  }
}



export default AddToMyShowsButton

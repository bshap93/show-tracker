import React from 'react';
import fetch from 'isomorphic-fetch'
import MyShowService from '../services/MyShowService'

class AddToMyShowsButton extends React.Component {

  handleOnSubmit = (event) => {
    event.preventDefault();
    var showData = this.props.data;
    var keyId = showData.ids.trakt;
    const myShow = {
      title: showData.title,
      year: showData.year,
      slug: showData.ids.slug,
      description: showData.overview,
      extended_info: showData,
      number_of_shows_aired: showData.aired_episodes,
      trakt_id: keyId,
      trailer_url: showData.trailer
    }

    MyShowService.createMyShow(myShow).then(myShow => console.log("Created Show: ", myShow))

  }

  render() {
    if (true) {
      if (this.props.disabled) {
        var theButton = <button className="bg-success text-white" disabled>Added</button>
      } else {
        var theButton = <button>Add to My Shows</button>
      }
    }
    return (
      <form onSubmit={this.handleOnSubmit}>


        {theButton}
      </form>

    )
  }
}



export default AddToMyShowsButton

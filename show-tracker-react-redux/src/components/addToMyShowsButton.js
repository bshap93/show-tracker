import React from 'react';
import fetch from 'isomorphic-fetch'
import MyShowService from '../services/MyShowService'
import MyShows from '../containers/MyShows'

class AddToMyShowsButton extends React.Component {

  handleOnClickAdd = (event) => {
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

    MyShowService.createMyShow(myShow)
      .then(myShow => {
        console.log("Created Show: ", myShow);
        this.history.pushState(null, '/myShows')
    })

  }


  handleOnClickEpisodes = (event) => {
    event.preventDefault();
    debugger
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

    MyShows.showEpisodes(myShow)
  }

  render() {
    if (!this.props.inMyShows) {
      if (this.props.disabled) {
        var theButton = <form><button className="bg-success text-white" disabled>Added</button></form>
      } else {
        var theButton = <form onSubmit={this.handleOnClickAdd}><button >Add to My Shows</button></form>
      }
    } else {
      var theButton = <button onClick={event => this.handleOnClickEpisodes(event)}>View Episodes</button>
    }
    return (
      <div>
        {theButton}
      </div>

    )
  }
}



export default AddToMyShowsButton

import React from 'react';
import fetch from 'isomorphic-fetch'
import MyShowService from '../services/MyShowService'
import MyShows from '../containers/MyShows'
import { addSeason } from '../actions/addSeason'
import { clearSeasons } from '../actions/clearSeasons'
import { setCurrentShow } from '../actions/setCurrentShow'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


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
    this.props.clearSeasons()
    var showData = this.props.data;
    var keyId = showData.trakt_id;
    const myShow = {
      title: showData.title,
      year: showData.year,
      slug: showData.slug,
      description: showData.overview,
      extended_info: showData,
      number_of_shows_aired: showData.aired_episodes,
      trakt_id: keyId,
      trailer_url: showData.trailer
    }
    this.props.setCurrentShow(myShow)
    MyShowService.fetchSeasons(myShow)
      .then(seasons => seasons.forEach((season) => {
        var action = this.props.addSeason(season)
      })
    )
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

const mapStateToProps = (state) => {
  return { seasons: state.seasons}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addSeason: addSeason,
    clearSeasons: clearSeasons,
    setCurrentShow: setCurrentShow
  }, dispatch);
};




export default connect(mapStateToProps, mapDispatchToProps)(AddToMyShowsButton)

import React from 'react';
import fetch from 'isomorphic-fetch'
import MyShowService from '../services/MyShowService'
import MyShows from '../containers/MyShows'
import Added from './Added'
import { addSeason } from '../actions/addSeason'
import { clearSeasons } from '../actions/clearSeasons'
import { clearEpisodes } from '../actions/clearEpisodes'
import { clearMyShows } from '../actions/clearMyShows'
import { setCurrentShow } from '../actions/setCurrentShow'
import { addMyShow } from '../actions/addMyShow'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class AddToMyShowsButton extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      inMyShowsState: this.props.inMyShows
    }
  }

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
    this.props.clearEpisodes()
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

  handleOnClickShowDelete = (event) => {
    event.preventDefault();
    var showData = this.props.data;
    var keyId = showData.trakt_id;
    const myShow = {
      id: showData.id,
      title: showData.title,
      year: showData.year,
      slug: showData.slug,
      description: showData.overview,
      extended_info: showData,
      number_of_shows_aired: showData.aired_episodes,
      trakt_id: keyId,
      trailer_url: showData.trailer
    }

    MyShowService.deleteMyShow(myShow)
      .then(json => console.log(json))
    this.setState({
      inMyShowsState: false
    })
  }


  render() {
    if (!this.props.inMyShows) {
      if (this.props.disabled) {
        var theButton = <Added />
      } else {
        var theButton = <form onSubmit={this.handleOnClickAdd}><button >Add to My Shows</button></form>
      }
    } else {
      if (this.state.inMyShowsState) {
        var theButton =
        <div>
          <button onClick={event => this.handleOnClickShowDelete(event)}>Delete from My Shows</button>
          <button onClick={event => this.handleOnClickEpisodes(event)}>View Episodes</button>
        </div>
      } else {
        var theButton =
        <div>
          <button className="bg-warning text-white" disabled>Deleted from My Shows</button>
        </div>
      }
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
    setCurrentShow: setCurrentShow,
    clearEpisodes: clearEpisodes,
    clearMyShows: clearMyShows,
    addMyShow: addMyShow,
  }, dispatch);
};




export default connect(mapStateToProps, mapDispatchToProps)(AddToMyShowsButton)

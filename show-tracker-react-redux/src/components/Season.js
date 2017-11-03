import React from 'react';
import { connect } from 'react-redux';
import MyShowService from '../services/MyShowService'
import { bindActionCreators } from 'redux';
import { addEpisode } from '../actions/addEpisode'
import { clearEpisodes } from '../actions/clearEpisodes'
import { clearSeasons } from '../actions/clearSeasons'


class Season extends React.Component {
  constructor() {
    super()

    this.state = {
      episodes: []
    }
  }

  handleSeasonClick = (event) => {
    this.props.clearSeasons()
    var seasonNum = event.target.childNodes[1]
    const myShow = this.props.store.getState().currentShow

    MyShowService.fetchEpisodes(myShow, seasonNum)
    .then(episodes => episodes.forEach((episode) => {
      var action = this.props.addEpisode(episode)
      console.log(this.props.store.getState())
      })
    )
  }


  render() {
    return(
      <div>
        <h3 className="well col-sm-6"><button onClick={this.handleSeasonClick}>Season {this.props.season.number}</button></h3>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return { episodes: state.episodes}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    clearSeasons: clearSeasons,
    addEpisode: addEpisode,
    clearEpisodes: clearEpisodes
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Season)

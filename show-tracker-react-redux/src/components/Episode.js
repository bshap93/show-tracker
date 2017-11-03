import React from 'react';
import { connect } from 'react-redux';
import MyShowService from '../services/MyShowService'
import { bindActionCreators } from 'redux';
import { addEpisode } from '../actions/addEpisode'
import { clearEpisodes } from '../actions/clearEpisodes'


class Episode extends React.Component {
  constructor() {
    super()

    this.state = {
      episodes: [],
      description: ""
    }
  }

  revealDescription = () => {
    this.setState({
      description: this.props.episode.overview
    })
  }

  render() {
    var date = ""
    if (this.props.episode.first_aired) {
      var year = this.props.episode.first_aired.slice(0, 4)
      var month = this.props.episode.first_aired.slice(5, 7)
      var day = this.props.episode.first_aired.slice(8, 10)
      date = month + '/' + day + '/' + year
    }
    return(
      <div className="well">
        <h2>{this.props.episode.title}</h2><h4>Season {this.props.episode.season}, Episode {this.props.episode.number}</h4>
        <h4>First aired: {date}</h4>
        <h4><a onClick={this.revealDescription}>More Info</a></h4>
        {this.state.description}
        <h4> <a href={"https://trakt.tv/shows/" + this.props.store.getState().currentShow.slug + "/seasons/" + this.props.episode.season + "/episodes/" + this.props.episode.number} >Watch Now!</a></h4>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return { episodes: state.episodes}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addEpisode: addEpisode,
    clearEpisodes: clearEpisodes
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Episode)

import React from 'react';
import { connect } from 'react-redux';
import MyShowService from '../services/MyShowService'
import { bindActionCreators } from 'redux';

class Season extends React.Component {
  constructor() {
    super()

    this.state = {
      episodes: []
    }
  }

  handleSeasonClick = (event) => {
    var seasonNum = event.target.childNodes[1]
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
    addEpisode: addEpisode,
    clearEpisodes: clearEpisodes
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Season)

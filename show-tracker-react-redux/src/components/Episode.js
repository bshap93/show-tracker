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
      episodes: []
    }
  }


  render() {
    return(
      <div>
        <h3 className="well col-sm-6">Hello</h3>
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

import React from 'react';
import { connect } from 'react-redux';
import MyShowService from '../services/MyShowService'
import { bindActionCreators } from 'redux';
import Episode from '../components/Episode'


class Episodes extends React.Component {

  constructor() {
    super()

    this.state = {
      episodes: []
    }
  }

  render() {
    try {
      var count = this.props.store.getState().episodes.length
      var episodes = this.props.store.getState().episodes.map((episode, index) =>
        <Episode store={this.props.store} episode={episode} />
      )
    } catch(err) {
      console.log(err)
      var episodes = ""
    }
    return (
      <div className="col-sm-6">
        {count} Episodes
        <hr/>
        {episodes}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return { episodes: state.episodes}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Episodes);

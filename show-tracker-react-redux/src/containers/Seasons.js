import React from 'react';
import { connect } from 'react-redux';
import MyShowService from '../services/MyShowService'
import { bindActionCreators } from 'redux';
import Season from '../components/Season'


class Seasons extends React.Component {

  constructor() {
    super()

    this.state = {
      seasons: []
    }
  }

  render() {
    try {
      var count = this.props.store.getState().seasons.length -1
      var seasons = this.props.store.getState().seasons.map((season, index) =>
        <Season store={this.props.store} season={season} />
      )
    } catch(err) {
      console.log(err)
      var seasons = ""
    }
    return (
      <div className="col-sm-6">
        {count} Seasons
        <hr/>
        {seasons}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return { seasons: state.seasons}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Seasons);

import { connect } from 'react-redux';
import { addMyShow } from '../actions/addMyShow.js';
import { clearMyShows } from '../actions/clearMyShows.js';
import React from 'react';
import MyShowService from '../services/MyShowService'
import { bindActionCreators } from 'redux';
import ShowCard from '../components/ShowCard.js'


class MyShows extends React.Component {

  constructor() {
    super();

    this.state = {
      myShows: []
    };
  }

  showEpisodes = (show) => {

  }

  componentDidMount() {
    this.props.clearMyShows()
    MyShowService.fetchMyShows()//.then(myShows => this.setState({ myShows }))
    .then(json => json.forEach((myShow) => {
      var action = this.props.addMyShow(myShow)
      console.log(this.props.store.getState())
    }))

    // fetch("localhost:3001/api/v1/my_shows", {credentials: 'same-origin'})

  }

  render(){
    try {
      var myShows = this.props.myShows.reverse().map((show, index) =>
        <ShowCard traktKey={show.trakt_id} episodes={show.number_of_shows_aired} title={show.title} data={show} trailerUrl={show.trailer_url} year={show.year} description={show.description} inMyShows={true} store={this.props.store} columns={1} />
      )
    } catch(err) {
      console.log(err)
      var popShows = ""
    }
    console.log(this.state.myShows)
    return (
      <div>
        <p className="well" >My Shows </p>
        <div className="col-sm-6">
          <p>{myShows.length} Shows</p>
          {myShows}
        </div>

        <div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myShows: state.myShows,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addMyShow: addMyShow,
    clearMyShows: clearMyShows
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MyShows)

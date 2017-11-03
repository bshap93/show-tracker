import { connect } from 'react-redux';
import { addMyShow } from '../actions/addMyShow.js';
import { clearMyShows } from '../actions/clearMyShows.js';
import React from 'react';
import MyShowService from '../services/MyShowService'
import { bindActionCreators } from 'redux';
import ShowCard from '../components/ShowCard.js'
import Seasons from './Seasons'
import Episodes from './Episodes'


class MyShows extends React.Component {

  constructor() {
    super();

    this.state = {
      myShows: [],
      episodes: [],
      panel: null
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
    this.setState({
      panel: <Seasons store={this.props.store} />
    })

    setInterval(() => {
      if (this.props.store.getState().episodes.length === 0) {
        this.setState({
          panel: <Seasons store={this.props.store} />
        })
      } else {
        this.setState({
          panel: <Episodes store={this.props.store} />
        })
      }
    }, 2000);

    // fetch("localhost:3001/api/v1/my_shows", {credentials: 'same-origin'})

  }

  componentDidUpdate( ) {

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
          <p>{myShows.length} Shows</p><hr/>
          {myShows}
        </div>

        <div>
          {this.state.panel}
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

import { connect } from 'react-redux';
import { addMyShow } from '../actions/addMyShow.js';
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

  componentDidMount() {
    MyShowService.fetchMyShows().then(myShows => this.setState({ myShows }))
    // .then(json => json.forEach((myShow) => {
    //   var action = this.props.addMyShow(myShow)
    //   console.log(this.props.store.getState())
    // }))

    // fetch("localhost:3001/api/v1/my_shows", {credentials: 'same-origin'})

  }

  render(){
    try {
      var myShows = this.state.myShows.map((show, index) =>
        <ShowCard key={show.ids.trakt} episodes={show.aired_episodes} title={show.title} trailerUrl={show.trailer} year={show.year} description={show.overview} />
      )
    } catch(err) {
      console.log(err)
      var popShows = ""
    }
    console.log(this.state.myShows)
    return (
      <div>
        <p className="well" >My Shows </p>
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
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MyShows)

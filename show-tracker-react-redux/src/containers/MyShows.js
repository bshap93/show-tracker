import { connect } from 'react-redux';
import { addSearchedShow, clearSearchedShows } from '../actions/addSearchedShow.js';
import React from 'react';
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
    fetch("/api/v1/my_shows", {credentials: 'same-origin'})
      .then(resp =>
        {
          debugger
          resp.json()
        }
      )
      .then(json => {
        console.log(json)
      })
  }

  render(){
    return (
      <div>
        <p className="well" >My Shows </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // return {
  //   searchedShows: state.searchedShows,
  //   title: state.title
  // }
}

const mapDispatchToProps = (dispatch) => {
  // return bindActionCreators({
  //   addSearchedShow: addSearchedShow,
  //   clearSearchedShows: clearSearchedShows
  // }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MyShows)

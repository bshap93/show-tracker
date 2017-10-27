import { connect } from 'react-redux';
import { addMyShow } from '../actions/addMyShow.js';
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
      .then(resp => resp.json())
      .then(json => json.forEach((myShow) => {
        var action = this.props.addMyShow(myShow)
        console.log(this.props.store.getState())
      }))
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

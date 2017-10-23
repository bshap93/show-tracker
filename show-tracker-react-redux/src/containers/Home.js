import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPopularShow } from '../actions/addPopularShow.js'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      popularShows: [],
    }
  }

  componentDidMount() {

    var popularShowsResp = fetch("https://api.trakt.tv/shows/popular", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": "46019919fb833c48658924cc9fcb451e78c5800099c02ce35eb9f4f40547093f"
      },
    }).then(response => response.json())
      .then(json => json.forEach((popularShow) => {
        var action = this.props.addPopularShow(popularShow)
        console.log(this.props.store.getState())
      })
    )
  }

  render() {
    try {
      var popShows = this.props.popularShows.map((show, index) =>
        <p>{show.title}, {show.year}</p>
      )
    } catch(err) {
      console.log(err)
      var popShows = ""
    }
    return (
      <div>
        <header className="App-header">
          <img src="http://www.iconsfind.com/wp-content/uploads/2017/06/20170602_5930b7ab7dae9.png" className="App-logo" alt="logo" />
          <h1 className="App-title">Show Tracker</h1>
        </header>
        <p className="well">
          Get notified when all the shows you watch are on,<br/> no matter how long the break between seasons.
        </p>
        {popShows}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { popularShows: state.popularShows}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addPopularShow: addPopularShow
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)

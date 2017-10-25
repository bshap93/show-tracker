import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPopularShow } from '../actions/addPopularShow.js'
import ShowCard from '../components/ShowCard.js'
import Header from '../components/Header.js'

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
        <ShowCard title={show.title} posterUrl={show.posterUrl} year={show.year} />
      )
    } catch(err) {
      console.log(err)
      var popShows = ""
    }
    return (
      <div>
        <Header />
        <h1 className="">Popular Shows</h1>
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
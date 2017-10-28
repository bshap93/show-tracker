import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPopularShow } from '../actions/addPopularShow.js'
import ShowCard from '../components/ShowCard.js'


class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      popularShows: [],
    }
  }

  componentDidMount() {

    var popularShowsResp = fetch("https://api.trakt.tv/shows/popular?extended=full", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": "46019919fb833c48658924cc9fcb451e78c5800099c02ce35eb9f4f40547093f"
      },
    }).then(response => response.json())
      .then(json => json.forEach((popularShow) => {
        if (popularShow.trailer) {
          popularShow.trailer = popularShow.trailer.replace("watch?v=", "embed/")
        }
        var action = this.props.addPopularShow(popularShow)
        console.log(this.props.store.getState())
      })
    )
  }

  render() {
    try {
      var popShows = this.props.popularShows.map((show, index) =>
        <ShowCard key={show.ids.trakt} episodes={show.aired_episodes} title={show.title} trailerUrl={show.trailer} year={show.year} description={show.overview} />
      )
    } catch(err) {
      console.log(err)
      var popShows = ""
    }
    return (
      <div>

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

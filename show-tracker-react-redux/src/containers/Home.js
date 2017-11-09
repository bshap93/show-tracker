import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPopularShow } from '../actions/addPopularShow.js'
import ShowCard from '../components/ShowCard.js'
import { TRAKT_API_KEY } from "../env.js"


class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      popularShows: [],
      popularShowsPage: 1,
    }
  }



  componentDidMount() {
    if (this.props.store.getState().popularShows.length === 0) {
      var popularShowsResp = fetch("https://api.trakt.tv/shows/popular?page=1&limit=10&extended=full", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key": TRAKT_API_KEY
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
    setInterval(() => {
      this.setState(this.state)
    }, 2000);
  }

  morePopularShows = () => {
    this.setState({
      popularShowsPage: ++this.state.popularShowsPage,
    })
    debugger
    var popularShowsResp = fetch(`https://api.trakt.tv/shows/popular?page=${this.state.popularShowsPage}&limit=10&extended=full`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": TRAKT_API_KEY
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
        <ShowCard traktKey={show.ids.trakt} episodes={show.aired_episodes} title={show.title} trailerUrl={show.trailer} year={show.year} description={show.overview} data={show} inMyShows={false} store={this.props.store} columns={2} />
      )
    } catch(err) {
      console.log(err)
      var popShows = ""
    }
    return (
      <div>

        <p className="well" >Popular Shows </p>
        <div class="border row">
          {popShows}
        </div>
        <button onClick={event => this.morePopularShows(event)} className="btn btn-primary active">More Popular Shows</button>
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

import { connect } from 'react-redux';
import { addSearchedShow, clearSearchedShows } from '../actions/addSearchedShow.js';
import React from 'react';
import { bindActionCreators } from 'redux';
import ShowCard from '../components/ShowCard.js'
import { TRAKT_API_KEY } from "../env.js"


class ShowsSearch extends React.Component {

  constructor() {
    super();

    this.state = {
      title: '',
      searchedShows: []
    };
  }

  componentDidUpdate() {
    if (this.props.store.getState().searchedShows.length === 0) {
      var searchedShowResp = fetch("https://api.trakt.tv/search/show?query=" + this.state.title + "&limit=10&extended=full", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key": TRAKT_API_KEY
        },
      }).then(response => response.json())
        .then(json => json.forEach((searchedShow) => {
          searchedShow = searchedShow.show
          if (searchedShow.trailer) {
            searchedShow.trailer = searchedShow.trailer.replace("watch?v=", "embed/")
          }
          var action = this.props.addSearchedShow(searchedShow)
          console.log(this.props.store.getState())
        }))
    }
  }

  handleOnChange = event => {
    console.log(this.state.searchedShows)
    this.setState({
      title: event.target.value,
      searchedShows: []
    });
    this.props.clearSearchedShows();
  }

  render(){
    try {
      var searchedShowsList = this.props.searchedShows.map((show, index) =>
        <ShowCard title={show.title} episodes={show.aired_episodes} trailerUrl={show.trailer} year={show.year} description={show.overview} />
      )
    } catch(err) {
      console.log(err)
      var popShows = ""
    }
    return (
      <div>
        <form className="well" style={{ margin: '20px 250px' }} onSubmit={this.handleOnSubmit} >
          <input
            type="text"
            onChange={this.handleOnChange}
            placeholder="Add a Show" />
        </form>
        {searchedShowsList}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchedShows: state.searchedShows,
    title: state.title
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addSearchedShow: addSearchedShow,
    clearSearchedShows: clearSearchedShows
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowsSearch)

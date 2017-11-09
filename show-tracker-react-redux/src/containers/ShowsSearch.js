import { connect } from 'react-redux';
import { addSearchedShow, clearSearchedShows } from '../actions/addSearchedShow.js';
import { fetchSearchedShows } from '../actions/fetchSearchedShows'
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

  // componentDidMount( ) {
  //   setInterval(() => {
  //     this.setState(this.state)
  //   }, 2000);
  // }

  // componentDidUpdate() {
  //   console.log(this.props.store.getState())
  //   // setTimeout(() => {
  //   //   // if (this.props.store.getState().searchedShows.length > 10) {
  //   //   //   this.props.clearSearchedShows();
  //   //   // }
  //   //   if (this.props.store.getState().searchedShows.length === 0) {
  //   //     var searchedShowResp = fetch("https://api.trakt.tv/search/show?query=" + this.state.title + "&limit=10&extended=full", {
  //   //       method: "GET",
  //   //       headers: {
  //   //         "Content-Type": "application/json",
  //   //         "trakt-api-version": "2",
  //   //         "trakt-api-key": TRAKT_API_KEY
  //   //       },
  //   //     }).then(response => response.json())
  //   //       .then(json => json.forEach((searchedShow) => {
  //   //         searchedShow = searchedShow.show
  //   //         if (searchedShow.trailer) {``
  //   //           searchedShow.trailer = searchedShow.trailer.replace("watch?v=", "embed/")
  //   //         }
  //   //         var action = this.props.addSearchedShow(searchedShow)
  //   //
  //   //       }))
  //   //   }
  //   // }, 1000);
  //
  // }

  handleOnChange = event => {
    console.log(this.state.searchedShows)
    this.setState({
      title: event.target.value,
    });
    this.props.clearSearchedShows();
    this.props.fetchSearchedShows(event.target.value);

  }

  render(){
    try {
      var searchedShowsList = this.props.searchedShows.map((show, index) =>
        <ShowCard traktKey={show.show.ids.trakt} title={show.show.title} episodes={show.show.aired_episodes} trailerUrl={show.show.trailer} year={show.show.year} description={show.show.overview} data={show.show} inMyShows={false} store={this.props.store} columns={2} />
      )
    } catch(err) {
      console.log(err)
      var popShows = ""
    }
    return (
      <div>
        <p className="well" >Add Shows </p>
        <form className="well" style={{ margin: '20px 250px' }} onSubmit={this.handleOnSubmit} >
          <input
            type="text"
            onChange={this.handleOnChange}
            placeholder="Add a Show" />
        </form>
        {this.props.store.getState().searchedShows.length}
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
    clearSearchedShows: clearSearchedShows,
    fetchSearchedShows: fetchSearchedShows,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowsSearch)

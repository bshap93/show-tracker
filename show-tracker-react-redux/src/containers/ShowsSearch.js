import { connect } from 'react-redux';
import { addSearchedShow, clearSearchedShows } from '../actions/addSearchedShow.js';
import React from 'react';
import { bindActionCreators } from 'redux';
import ShowCard from '../components/ShowCard.js'


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
      var searchedShowResp = fetch("https://api.trakt.tv/search/show?query=" + this.state.title + "&limit=10", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key": "46019919fb833c48658924cc9fcb451e78c5800099c02ce35eb9f4f40547093f"
        },
      }).then(response => response.json())
        .then(json => json.forEach((searchedShow) => {
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
        <ShowCard title={show.show.title} posterUrl={show.posterUrl} year={show.show.year} />
      )
    } catch(err) {
      debugger
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

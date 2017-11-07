import React from 'react';
import Trailer from './Trailer'
import AddToMyShowsButton from './AddToMyShowsButton.js'
import MyShowService from '../services/MyShowService'
import { addEpisode } from '../actions/addEpisode'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class ShowCard extends React.Component {
  constructor() {
    super()

    this.state = {
      newEpisodes: "No new Episodes",
      myShow: null
    }
  }

  componentDidMount() {
    if (this.props.data.id){
      var updatedShow = MyShowService.fetchShow(this.props.data)
        .then(json => this.checkIfEpisodesChange(json))
    }
  }


  checkIfEpisodesChange = (show) => {
    if (show.aired_episodes > this.props.data.number_of_shows_aired) {
      this.setState({
        newEpisodes: `${show.title} has ${(show.aired_episodes - this.props.data.number_of_shows_aired)} new episodes`,
        myShow: {
          title: show.title,
          year: show.year,
          slug: show.ids.slug,
          description: show.overview,
          extended_info: show,
          number_of_shows_aired: show.aired_episodes,
          trakt_id: show.ids.trakt_id,
          trailer_url: show.trailer
        }
      })
    }
  }

  handleNewEpisodesClick = () => {
    MyShowService.deleteMyShow(this.props.data)
    MyShowService.createMyShow(this.state.myShow)
    this.displayNewEpisode()
  }

  displayNewEpisode = () => {
    MyShowService.fetchLatestEpisode(this.state.myShow)
      .then(json => {
        this.props.addEpisode(json)
      })
  }

  render() {
    var listOfMyShowIds = this.props.store.getState().myShows.map(show => {
      return show.trakt_id
    })

    if (listOfMyShowIds.includes('' + this.props.traktKey)) {
      var button = <AddToMyShowsButton key={this.props.key} data={this.props.data} inMyShows={this.props.inMyShows} disabled={true} store={this.props.store}>Add to My Shows</AddToMyShowsButton>
    } else {
      var button = <AddToMyShowsButton key={this.props.key} data={this.props.data} inMyShows={this.props.inMyShows} disabled={false} store={this.props.store}>Add to My Shows</AddToMyShowsButton>
    }

    if (this.props.trailerUrl) {
      var trailer = <Trailer trailerUrl={this.props.trailerUrl}/> //
    } else {
      var trailer = this.props.description
    }

    if (this.props.columns === 1) {
      var classRows = "well"
    } else {
      var classRows = "well col-sm-6"
    }
    if (this.props.data.id){
      var newEpisodes = <button onClick={this.handleNewEpisodesClick}>{this.state.newEpisodes}</button>
    }

    return (
      <div className={classRows}>
        {trailer}
        <h2>{this.props.title}</h2><h4>Premiered in {this.props.year}, {this.props.episodes} aired episodes</h4>
        {newEpisodes}
        {button}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addEpisode: addEpisode
  }, dispatch);
};


export default connect(null, mapDispatchToProps)(ShowCard)

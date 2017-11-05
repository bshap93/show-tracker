import React from 'react';
import Trailer from './Trailer'
import AddToMyShowsButton from './AddToMyShowsButton.js'

class ShowCard extends React.Component {
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


    return (
      <div className={classRows}>
        {trailer}
        <h2>{this.props.title}</h2><h4>Premiered in {this.props.year}, {this.props.episodes} aired episodes</h4>
        {button}
      </div>
    )
  }
}

export default ShowCard

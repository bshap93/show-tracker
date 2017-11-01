import React from 'react';
import AddToMyShowsButton from './AddToMyShowsButton.js'

class ShowCard extends React.Component {
  render() {
    var listOfMyShowIds = this.props.store.getState().myShows.map(show => {
      return show.trakt_id
    })

    if (listOfMyShowIds.includes('' + this.props.traktKey)) {
      var button = <AddToMyShowsButton key={this.props.key} data={this.props.data} inMyShows={this.props.inMyShows} disabled={true}>Add to My Shows</AddToMyShowsButton>
    } else {
      var button = <AddToMyShowsButton key={this.props.key} data={this.props.data} inMyShows={this.props.inMyShows} disabled={false}>Add to My Shows</AddToMyShowsButton>
    }

    if (this.props.trailerUrl) {
      var trailer = <iframe width="315" height="200" src={this.props.trailerUrl} frameborder="0" allowfullscreen></iframe>
    } else {
      var trailer = this.props.description
    }


    return (
      <div className="well col-sm-6">
        {trailer}
        <h2>{this.props.title}</h2><h4>Premiered in {this.props.year}, {this.props.episodes} aired episodes</h4>
        {button}
      </div>
    )
  }
}

export default ShowCard

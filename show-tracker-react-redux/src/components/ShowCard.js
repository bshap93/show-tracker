import React from 'react';
import AddToMyShowsButton from './AddToMyShowsButton.js'

class ShowCard extends React.Component {
  render() {
    if (this.props.trailerUrl) {
      var trailer = <iframe width="315" height="200" src={this.props.trailerUrl} frameborder="0" allowfullscreen></iframe>
    } else {
      var trailer = this.props.description
    }
    return (
      <div className="well col-sm-6">
        {trailer}
        <h2>{this.props.title}</h2><h4>Premiered in {this.props.year}, {this.props.episodes} aired episodes</h4>
        <AddToMyShowsButton key={this.props.key} data={this.props.data}>Add to My Shows</AddToMyShowsButton>
      </div>
    )
  }
}

export default ShowCard

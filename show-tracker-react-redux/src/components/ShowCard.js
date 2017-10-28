import React from 'react';
import AddToMyShowsButton from './addToMyShowsButton.js'

class MoviesAbout extends React.Component {
  render() {
    if (this.props.trailerUrl) {
      var trailer = <iframe width="420" height="315" src={this.props.trailerUrl} frameborder="0" allowfullscreen></iframe>
    } else {
      var trailer = this.props.description
    }
    return (
      <div className="well">
        {trailer}
        <h2>{this.props.title}</h2><h4>Premiered in {this.props.year}, {this.props.episodes} aired episodes</h4>
        <AddToMyShowsButton key={this.props.key} show={this.props}>Add to My Shows</AddToMyShowsButton>
      </div>
    )
  }
}

export default MoviesAbout

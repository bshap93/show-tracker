import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar.js'
import Home from './containers/Home.js'
import AddShow from './containers/AddShow.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavBar />
            <Route exact path="/" render={(props) => (<Home store={this.props.store}/>)} />
            {/*<Route exact path="/myShows/new" render={AddShow} />*/}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

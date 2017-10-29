import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar.js'
import Home from './containers/Home.js'
import ShowsSearch from './containers/ShowsSearch.js'
import MyShows from './containers/MyShows.js'
import Header from './components/Header.js'
import NotFound from './components/NotFound.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <div>
            <NavBar />
            <Route exact path="/" render={(props) => (<Home store={this.props.store}/>)} />
            <Route exact path="/myShows" render={(props) => (<MyShows store={this.props.store}/>)} />
            <Route exact path="/myShows/new" render={(props) => (<ShowsSearch store={this.props.store}/>)} />
            <Route exact path="*" component={NotFound} />
            {/*<Route exact path="/myShows/new" render={AddShow} />*/}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

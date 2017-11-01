import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar.js'
import Home from './containers/Home.js'
import ShowsSearch from './containers/ShowsSearch.js'
import MyShows from './containers/MyShows.js'
import Header from './components/Header.js'
import NotFound from './components/NotFound.js'
const scrapeIt = require("scrape-it")

class App extends Component {
  componentDidMount() {
    scrapeIt("https://ionicabizau.net", {
        title: ".header h1"
      , desc: ".header h2"
      , avatar: {
            selector: ".header img"
          , attr: "src"
        }
    }).then(page => {
        console.log(page)
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <div>
            <NavBar />
            <Switch>
              <Route exact path="/" render={(props) => (<Home store={this.props.store}/>)} />
              <Route exact path="/myShows" render={(props) => (<MyShows store={this.props.store}/>)} />
              <Route exact path="/myShows/new" render={(props) => (<ShowsSearch store={this.props.store}/>)} />
              <Route  component={NotFound } />
            </Switch>
            {/*<Route exact path="/myShows/new" render={AddShow} />*/}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

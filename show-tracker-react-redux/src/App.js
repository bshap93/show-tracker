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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addMyShow } from './actions/addMyShow.js';
import { clearMyShows } from './actions/clearMyShows.js';
import MyShowService from './services/MyShowService'
const scrapeIt = require("scrape-it")

class App extends Component {
  constructor() {
    super();

    this.state = {
      myShows: []
    };
  }

  componentDidMount() {
    this.props.clearMyShows();
    MyShowService.fetchMyShows()//.then(myShows => this.setState({ myShows }))
    .then(json => json.forEach((myShow) => {
      var action = this.props.addMyShow(myShow)
      console.log(this.props.store.getState())
    }))

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


const mapStateToProps = (state) => {
  return {
    myShows: state.myShows,
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addMyShow: addMyShow,
    clearMyShows: clearMyShows
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App)

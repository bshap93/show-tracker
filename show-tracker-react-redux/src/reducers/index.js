import { combineReducers } from 'redux';
import showsReducer from './showsReducer';

function popularShowReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_POPULAR_SHOW':
      return state.concat(action.popularShow)
    default:
      return state;
  }
};

function searhedShowReducer(state = [], action) {
  switch (action.type) {
    case 'START_ADDING_SEARCHED_SHOWS_REQUEST':
      return Object.assign({}, state, {loading: true})
    case 'ADD_SEARCHED_SHOWS':
      return action.shows;
    case 'ADD_SEARCHED_SHOW':
      return state.concat(action.searchedShow)
    case 'CLEAR_SEARCHED_SHOWS':
      return [];
    default:
      return state;
  }
};


function myShowReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_MY_SHOW':
      return state.concat(action.myShow)
    case 'CLEAR_MY_SHOWS':
      return [];
    default:
      return state;
  }
}

function mySeasonReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_SEASON':
      return state.concat(action.season)
    case 'CLEAR_SEASONS':
      return [];
    default:
      return state;
  }
}

function myEpisodeReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_EPISODE':
      return state.concat(action.episode)
    case 'CLEAR_EPISODES':
      return [];
    default:
      return state;
  }
}

function myCurrentShowReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_CURRENT_SHOW':
      return action.show
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  popularShows: popularShowReducer,
  searchedShows: searhedShowReducer,
  myShows: myShowReducer,
  episodes: myEpisodeReducer,
  seasons: mySeasonReducer,
  currentShow: myCurrentShowReducer,

})

export default rootReducer

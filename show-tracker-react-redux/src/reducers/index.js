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
    case 'ADD_SEARCHED_SHOW':
      return state.concat(action.searchedShow)
    case 'CLEAR_SEARCHED_SHOWS':
      return [];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  popularShows: popularShowReducer,
  searchedShows: searhedShowReducer
})

export default rootReducer

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

const rootReducer = combineReducers({
  popularShows: popularShowReducer
})

export default rootReducer

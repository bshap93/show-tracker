import { TRAKT_API_KEY } from "../env.js"
export function fetchSearchedShows(searchTerm) {
  return (dispatch) => {
    dispatch({ type: 'START_ADDING_SEARCHED_SHOWS_REQUEST'});

    return fetch("https://api.trakt.tv/search/show?query=" + searchTerm + "&limit=10&extended=full", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": TRAKT_API_KEY
      },
    }).then(response => response.json())
      .then(shows => dispatch({type: 'ADD_SEARCHED_SHOWS', shows}))
  }
}

export function fetchPopular() {
  return (dispatch) => {
    dispatch({ type: 'START_LOADING_POPULAR' });
    return fetch("https://api.trakt.tv/shows/popular", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": "46019919fb833c48658924cc9fcb451e78c5800099c02ce35eb9f4f40547093f"
      },
    })
      .then(response => response.json())
      .then(shows => dispatch({ type: 'ADD_POPULAR', shows }));
  };
}

import { TRAKT_API_KEY } from "../env.js"
const API_URL = process.env.REACT_APP_API_URL
console.log(API_URL)


const MyShowService = {
  fetchMyShows: () => {
    return fetch(`${API_URL}/my_shows`)
      .then(response => response.json())
  },

  createMyShow: (myShow) => {
    const request = {
      method: 'POST',
      body: JSON.stringify({
        "my_show": myShow
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    return fetch(`${API_URL}/my_shows`, request)
      .then(response => response.json())
  },

  fetchSeasons: (myShow) => {
    return fetch("https://api.trakt.tv/shows/" + myShow.slug + "/seasons", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": TRAKT_API_KEY
      },
    }).then(response => response.json())
  }

}

export default MyShowService;

const MyShowService = {
  fetchMyShows: () => {
    return fetch('localhost:3001/api/v1/my_shows')
      .then(response => response.json())
  }
}

export default MyShowService;

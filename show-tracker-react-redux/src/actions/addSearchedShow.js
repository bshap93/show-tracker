export const addSearchedShow = (searchedShow) => {
  return {
    type: 'ADD_SEARCHED_SHOW',
    searchedShow
  }
}

export const clearSearchedShows = () => {
  return {
    type: 'CLEAR_SEARCHED_SHOWS'
  }
}

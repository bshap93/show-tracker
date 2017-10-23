let counter = 3;

export function addShow(show) {
  show.id = ++counter;
  return {
    type: 'ADD_SHOW',
    show
  };
}

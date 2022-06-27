import { csrfFetch } from "./csrf"

const GET_NOTEBOOKS = 'notebooks/getNotebooks'

const get = (notebooks) => {
  return {
    type: GET_NOTEBOOKS,
    notebooks
  }
}

export const getNotebooks = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/notebooks/users/${userId}`)
  const data = await response.json();
  dispatch(get(data));
  return data;
}

// export const createNotebook = (userId) => async dispatch => {
//   const response = await csrfFetch(``)
// }

const notebookReducer = (state = {}, action) => {
  console.log('action:: ', action);
  let newState = { ...state }
  switch (action.type) {
    case GET_NOTEBOOKS:
      action.notebooks.forEach(notebook => {
        newState[notebook.id] = notebook;
      });
      return newState;
    default:
      return state;
  };
};

export default notebookReducer;

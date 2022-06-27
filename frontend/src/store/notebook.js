import { csrfFetch } from "./csrf";

const GET_NOTEBOOKS = 'notebooks/getNotebooks';
const POST_NOTEBOOK = 'notebooks/postNotebook';

const get = (notebooks) => {
  return {
    type: GET_NOTEBOOKS,
    notebooks
  };
};

const post = (notebook) => {
  return {
    type: POST_NOTEBOOK,
    notebook
  };
};

export const getNotebooks = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/notebooks/users/${userId}`)
  const data = await response.json();
  dispatch(get(data));
  return data;
};

export const createNotebook = (payload) => async dispatch => {
  console.log(payload.userId);
  const response = await csrfFetch(`/api/notebooks/users/${payload.userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (response.ok) {
    const notebook = await response.json();
    dispatch(post(notebook));
    return notebook;
  }
}

const notebookReducer = (state = {}, action) => {
  console.log('action:: ', action);
  let newState = { ...state }
  switch (action.type) {
    case GET_NOTEBOOKS:
      action.notebooks.forEach(notebook => {
        newState[notebook.id] = notebook;
      });
      return newState;
    case POST_NOTEBOOK:
      newState = {
        ...state,
        [action.notebook.id]: action.notebook
      };
    default:
      return state;
  };
};

export default notebookReducer;

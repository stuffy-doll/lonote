import { csrfFetch } from "./csrf";

// Constants
const GET_NOTEBOOKS = 'notebooks/getNotebooks';
const POST_NOTEBOOK = 'notebooks/postNotebook';
const UPDATE_NOTEBOOK = 'notebooks/updateNotebook';
const DELETE_NOTEBOOK = 'notebooks/deleteNotebook';

// Action creators
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

const update = (notebook) => {
  return {
    type: UPDATE_NOTEBOOK,
    notebook
  }
}

const destroy = (notebook) => {
  return {
    type: DELETE_NOTEBOOK,
    notebook
  }
}

// Thunks
export const getNotebooks = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/notebooks/users/${userId}`)
  const data = await response.json();
  dispatch(get(data));
  return data;
};

export const createNotebook = (payload) => async dispatch => {
  const response = await csrfFetch(`/api/notebooks/users/${payload.userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (response.ok) {
    const notebook = await response.json();
    dispatch(post(notebook));
    return notebook;
  };
};

// export const updateNotebook = (payload) => async dispatch => {
//   const response = await csrfFetch(`/api/notebooks/${payload.notebookId}`)
// }

export const deleteNotebook = (notebookId) => async dispatch => {
  const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    const notebook = await response.json();
    dispatch(destroy(notebook));
    return notebook;
  };
};

// Reducer
const notebookReducer = (state = {}, action) => {
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
      return newState;
    case UPDATE_NOTEBOOK:
      return {
        ...state,
        [action.notebook.id]: action.notebook
      }
    case DELETE_NOTEBOOK:
      newState = { ...state };
      delete newState[action.notebook.id];
      return newState
    default:
      return state;
  };
};

export default notebookReducer;

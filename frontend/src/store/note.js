import { csrfFetch } from "./csrf";

// Constants
const GET_NOTES = 'notes/getNotes';
const CREATE_NOTE = 'notes/postNote';
const UPDATE_NOTE = 'notes/updateNote';
const DELETE_NOTE = 'notes/deleteNote';

// Actions
const get = (notes) => {
  return {
    type: GET_NOTES,
    notes
  };
};

const create = (note) => {
  return {
    type: CREATE_NOTE,
    note
  };
};

const update = (note) => {
  return {
    type: UPDATE_NOTE,
    note
  };
};

const destroy = (note) => {
  return {
    type: DELETE_NOTE,
    note
  };
};

// Thunks
export const getNotes = (userId) => async dispatch => {
  // Filter through notebooks
  const response = await csrfFetch(`/api/notes/users/${userId}`);
  const notes = await response.json();
  dispatch(get(notes));
  return notes;
};

export const createNote = (payload) => async dispatch => {
  const response = await csrfFetch(`/api/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (response.ok) {
    const note = await response.json();
    dispatch(create(note));
    return note;
  };
};

export const updateNote = (payload) => async dispatch => {
  const response = await csrfFetch(`/api/notes/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (response.ok) {
    const note = await response.json();
    dispatch(update(note));
    return note;
  };
};

export const destroyNote = (noteId) => async dispatch => {
  const response = await csrfFetch(`/api/notes/${noteId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  const note = await response.json();
  dispatch(destroy(note));
  return note;
}

// Reducer
const noteReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_NOTES:
      action.notes.forEach(note => {
        newState[note.id] = note;
      });
      return newState;
    case CREATE_NOTE:
      newState = {
        ...state,
        [action.note.id]: action.note
      };
      return newState;
    case UPDATE_NOTE:
      newState = {
        ...state,
        [action.note.id]: action.note
      };
      return newState;
    case DELETE_NOTE:
      newState = { ...state }
      delete newState[action.note.id]
      return newState;
    default:
      return state
  }
}

export default noteReducer;

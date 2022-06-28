import { csrfFetch } from "./csrf";

// Constants

const GET_NOTES = 'notes/getNotes';
const CREATE_NOTE = 'notes/postNote';
const UPDATE_NOTE = 'notes/updateNote';
const DELETE_NOTE = 'notes/deleteNote';

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

export const getNotes = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/notebooks/users/${userId}`);
  const notes = await response.json();
  dispatch(get(notes));
  return notes;
}

export const noteReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_NOTES:
      action.notes.forEach(note => {
        newState[note.id] = note;
      });
      return newState;
    default:
      return state
  }
}

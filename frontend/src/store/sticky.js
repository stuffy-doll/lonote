import { csrfFetch } from "./csrf";

const UPDATE_STICKY = 'sticky/updateSticky'

const putSticky = (payload) => ({
  type: UPDATE_STICKY,
  payload
});

const unsuccessful = { "Message": "Unsuccessful" }

export const updateSticky = (payload) => async dispatch => {
  const res = await csrfFetch(`/api/sticky/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = res.json();
    dispatch(putSticky);
    return data;
  } else {
    return unsuccessful;
  };
};

const stickyReducer = (state = {}, action) => {
  let newState = { ...state }
  switch (action.type) {
    case UPDATE_STICKY:
      newState = {
        ...state,
        [action.payload.id]: action.payload
      };
      return newState;
    default:
      return state;
  };
};

export default stickyReducer;

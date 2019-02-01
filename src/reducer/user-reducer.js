// Action Constants
const LOG_OUT = 'LOG_OUT';
const LOG_IN = 'LOG_IN';
const CREATE_USER = 'CREATE_USER';
const SAVE_ITEM = 'SAVE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const UPDATE_TOP = 'UPDATE_TOP';

// Action Creators
export const createUser = payload => {
  return dispatch => {
    const url = `https://medicine-backend.herokuapp.com/api/v1/user`;
    fetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(results => results.json())
      .then(data => {
        return dispatch({ type: CREATE_USER, payload: data });
      })
      .catch(err => console.error(err));
  };
};

export const logIn = payload => {
  return dispatch => {
    const url = `https://medicine-backend.herokuapp.com/api/v1/user/${payload}`;
    fetch(url)
      .then(results => results.json())
      .then(data => {
        return dispatch({ type: LOG_IN, payload: data[0] });
      })
      .catch(err => console.error(err));
  };
};

export const logOut = payload => {
  return dispatch => {
    const url = `https://medicine-backend.herokuapp.com/api/v1/user/${payload}`;
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(results => results.json())
      .then(() => {
        return dispatch({ type: LOG_OUT });
      });
  };
};

export const saveItem = payload => {
  let newPayload = {
    [payload.rxcui]: {
      rxcui: payload.rxcui,
      name: payload.name
    }
  };
  return dispatch => {
    return dispatch({ type: SAVE_ITEM, payload: newPayload });
  };
};

export const deleteItem = payload => {
  return dispatch => {
    return dispatch({ type: DELETE_ITEM, payload });
  };
};
export const updateTopSearches = payload => {
  return dispatch => {
    return dispatch({ type: UPDATE_TOP, payload });
  };
};

// Initial State
let initialState = {
  username: '',
  password: '',
  userId: '',
  loggedIn: false,
  savedItems: {},
  topSearches: {}
};

// Reducer
export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'CREATE_USER':
      return {
        ...state,
        username: payload.username,
        password: payload.password,
        userId: payload._id,
        topSearches: { ...payload.topSearches },
        loggedIn: true
      };
    case 'LOG_IN':
      return {
        username: payload.username,
        password: payload.password,
        userId: payload._id,
        topSearches: { ...payload.topSearches },
        savedItems: { ...payload.savedItems },
        loggedIn: true
      };
    case 'LOG_OUT':
      return { state: initialState };
    case 'SAVE_ITEM':
      return { ...state, savedItems: { ...state.savedItems, ...payload } };
    case 'DELETE_ITEM':
      delete state.savedItems[payload];
      return { ...state, savedItems: { ...state.savedItems } };
    case 'UPDATE_TOP':
      let obj = {};
      if (state.topSearches[payload]) {
        obj = { ...state.topSearches, ...state.topSearches[payload]++ };
      } else {
        obj = { ...state.topSearches, ...(state.topSearches[payload] = 1) };
      }
      return { ...state, topSearches: { ...obj } };
    default:
      return state;
  }
};

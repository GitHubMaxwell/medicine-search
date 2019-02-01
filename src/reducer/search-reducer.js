// Action Constants
//===============
const POPULATE_LIST = 'POPULATE_LIST';
const POPULATE_ALT = 'POPULATE_ALT';
const ALT_TOGGLE = 'ALT_TOGGLE';

// Action Creators
//===============
export const populateList = payload => {
  return dispatch => {
    const url = `https://medicine-backend.herokuapp.com/api/v1/search/${payload.searchValue}`;
    fetch(url)
      .then(results => results.json())
      .then(data => {
        return dispatch({ type: POPULATE_LIST, payload: data });
      })
      .catch(err => console.error(err));
  };
};

export const populateAlternatives = payload => {
  return dispatch => {
    const urlIN = `https://medicine-backend.herokuapp.com/api/v1/alternatives/${payload}`;
    fetch(urlIN)
      .then(results => results.json())
      .then(data => {
        return dispatch({ type: POPULATE_ALT, payload: data });
      })
      .catch(err => console.error(err));
  };
};

export const altToggle = () => {
  return dispatch => {
    return dispatch({ type: ALT_TOGGLE });
  };
};

// Initial State
//===============
let initialState = {
  searchResults: [],
  alternatives: [],
  alt_toggle: false
};

// Reducer
//===============
export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'POPULATE_LIST':
      return { ...state, searchResults: [...payload], alt_toggle: false };
    case 'POPULATE_ALT':
      return { ...state, alternatives: [...payload], alt_toggle: true };
    case 'ALT_TOGGLE':
      return { ...state, alt_toggle: !state.alt_toggle };
    default:
      return state;
  }
};

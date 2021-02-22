// Actions
export const GET_USERS = "GET_USERS";
const SET_USERS = "SET_USERS";
const SET_USERSFROM = "SET_USERSFROM";
const SET_USERSTO = "SET_USERSTO";
const RESET_USERSTO = "RESET_USERSTO";
const RESET_USERSFROM = "RESET_USERSFROM";
const RESET_USERS = "RESET_USERS";

// Action Creators
export const getUsers = () => ({
  type: GET_USERS,
});
export const setUsers = (users) => ({
  type: SET_USERS,
  users,
});
export const setUserFrom = (user) => ({
  type: SET_USERSFROM,
  user,
});
export const setUserTo = (user) => ({
  type: SET_USERSTO,
  user,
});
export const resetUserFrom = () => ({
  type: RESET_USERSFROM,
});
export const resetUserTo = () => ({
  type: RESET_USERSTO,
});
export const resetUsers = () => ({
  type: RESET_USERS,
});

// Reducer
const initialState = {
  users: [],
  userFrom: null,
  userTo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_USERSFROM:
      return { ...state, userFrom: action.user };
    case SET_USERSTO:
      return { ...state, userTo: action.user };
    case RESET_USERS:
      return { ...state, users: [] };
    case RESET_USERSFROM:
      return { ...state, userFrom: null };
    case RESET_USERSTO:
      return { ...state, userTo: null };
    default:
      return state;
  }
};

export default userReducer;

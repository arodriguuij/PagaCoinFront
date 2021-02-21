export const GET_USERS = "GET_USERS";
const SET_USERS = "SET_USERS";

export const getUsers = () => ({
  type: GET_USERS,
});

export const setUsers = (users) => ({
  type: SET_USERS,
  users,
});

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.users };
    default:
      return state;
  }
};

export default userReducer;

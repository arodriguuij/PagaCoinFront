import { combineReducers, createStore } from "redux";
import newUserReducer from "./ducks/newUser";

const reducer = combineReducers({
  newUser: newUserReducer,
});
const store = createStore(reducer);

export default store;

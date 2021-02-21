import { call, put } from "redux-saga/effects";
import { requestGetUsers } from "./../requests/user";
import { setUsers } from "./../../redux/ducks/user";

export function* handleGetUsers(action) {
  try {
    const response = yield call(requestGetUsers);
    const { data } = response;
    yield put(setUsers(data));
  } catch (error) {
    console.log(error);
  }
}

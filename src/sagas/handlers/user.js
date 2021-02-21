import { call, put } from "redux-saga/effects";
import { requestGetUsers, requestPostUser } from "./../requests/user";
import { setUsers } from "./../../redux/ducks/user";
import { reset } from "./../../redux/ducks/newUser";

export function* handleGetUsers(action) {
  try {
    const response = yield call(requestGetUsers);
    const { data } = response;
    yield put(setUsers(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handlePostuser({ user }) {
  try {
    const response = yield call(() => requestPostUser(user));
    const { data } = response;
    yield put(reset(data));
  } catch (error) {
    console.log(error);
  }
}

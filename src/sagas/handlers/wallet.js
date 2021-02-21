import { call, put } from "redux-saga/effects";
import { setWalletsById } from "../../redux/ducks/wallet";
import { requestGeWalletsById } from "../requests/wallet";

export function* handleGetWalletsById(action) {
  try {
    const response = yield call(() => requestGeWalletsById(action.id));
    const { data } = response;
    yield put(setWalletsById(data));
  } catch (error) {
    console.log(error);
  }
}

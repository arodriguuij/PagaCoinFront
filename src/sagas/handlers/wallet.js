import { call, put } from "redux-saga/effects";
import { setWalletsById } from "../../redux/ducks/wallet";
import {
  requestGeWalletsByHashId,
  requestPostWallet,
} from "../requests/wallet";
import { addWalletIds } from "../../redux/ducks/newUser";

export function* handleGetWalletsByHashId(action) {
  try {
    const response = yield call(() => requestGeWalletsByHashId(action.id));
    const { data } = response;
    yield put(setWalletsById(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handlePostWallet({ props }) {
  try {
    const response = yield call(() =>
      requestPostWallet(props.name, props.quantity)
    );
    const { data } = response;
    yield put(addWalletIds(data.id));
  } catch (error) {
    console.log(error);
  }
}

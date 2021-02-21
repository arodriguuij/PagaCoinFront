import { call, put } from "redux-saga/effects";
import {
  resetWalletsToIds,
  setWalletsById,
  setWalletsFromById,
  setWalletsToById,
} from "../../redux/ducks/wallet";
import {
  requestGetWalletsByHashId,
  requestPostWallet,
} from "../requests/wallet";
import { addWalletIds } from "../../redux/ducks/newUser";
import { requestUpdateWalletByHashId } from "./../requests/wallet";
import { resetWalletsFromIds } from "./../../redux/ducks/wallet";

export function* handleGetWalletsByHashId(action) {
  try {
    const response = yield call(() => requestGetWalletsByHashId(action.id));
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
export function* handleGetWalletsFromByHashId(action) {
  try {
    const response = yield call(() => requestGetWalletsByHashId(action.id));
    const { data } = response;
    yield put(setWalletsFromById(data));
  } catch (error) {
    console.log(error);
  }
}
export function* handleGetWalletsToByHashId(action) {
  try {
    const response = yield call(() => requestGetWalletsByHashId(action.id));
    const { data } = response;
    yield put(setWalletsToById(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleUpdateWalletFromByHashId({ props }) {
  try {
    yield call(() =>
      requestUpdateWalletByHashId(props.id, props.name, props.quantity)
    );
    yield put(resetWalletsFromIds());
  } catch (error) {
    console.log(error);
  }
}
export function* handleUpdateWalletToByHashId({ props }) {
  try {
    yield call(() =>
      requestUpdateWalletByHashId(props.id, props.name, props.quantity)
    );
    yield put(resetWalletsToIds());
  } catch (error) {
    console.log(error);
  }
}

import { call, put } from "redux-saga/effects";
import {
  requestGeReceivedTransactionsById,
  requestGetReceivedTransactions,
  requestGetSentTransactions,
  requestGetSentTransactionsById,
} from "./../requests/transaction";
import {
  setSentTransactions,
  setReceivedTransactions,
  setSentTransactionsById,
  setReceivedTransactionsById,
} from "./../../redux/ducks/transaction";

export function* handleGetSentTransactions(action) {
  try {
    const response = yield call(() => requestGetSentTransactions(action.id));
    const { data } = response;
    yield put(setSentTransactions(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetReceivedTransactions(action) {
  try {
    const response = yield call(() =>
      requestGetReceivedTransactions(action.id)
    );
    const { data } = response;
    yield put(setReceivedTransactions(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetSentTransactionsById(action) {
  try {
    const response = yield call(() =>
      requestGetSentTransactionsById(action.id)
    );
    const { data } = response;
    yield put(setSentTransactionsById(data));
  } catch (error) {
    console.log(error);
  }
}
export function* handleGetReceivedTransactionsById(action) {
  try {
    const response = yield call(() =>
      requestGeReceivedTransactionsById(action.id)
    );
    const { data } = response;
    yield put(setReceivedTransactionsById(data));
  } catch (error) {
    console.log(error);
  }
}

import { call, put } from "redux-saga/effects";
import {
  requestGetReceivedTransactionsById,
  requestGetReceivedTransactions,
  requestGetSentTransactions,
  requestGetSentTransactionsById,
  requestPostTransaction,
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
      requestGetReceivedTransactionsById(action.id)
    );
    const { data } = response;
    yield put(setReceivedTransactionsById(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handlePostTransaction({ props }) {
  try {
    yield call(() => requestPostTransaction(props));
    debugger;
  } catch (error) {
    console.log(error);
  }
}

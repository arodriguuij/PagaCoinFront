import { takeLatest, takeEvery } from "redux-saga/effects";
import { handleGetUsers } from "./handlers/user";
import {
  handleGetSentTransactions,
  handleGetReceivedTransactions,
  handleGetSentTransactionsById,
  handleGetReceivedTransactionsById,
} from "./handlers/transaction";
import { GET_USERS } from "../redux/ducks/user";
import { GET_WALLETS_BYID } from "./../redux/ducks/wallet";
import {
  GET_RECEIVEDTRANSACTIONS,
  GET_RECEIVEDTRANSACTIONS_BYID,
  GET_SENTTRANSACTIONS,
  GET_SENTTRANSACTIONS_BYID,
} from "./../redux/ducks/transaction";
import { handleGetWalletsById } from "./handlers/wallet";

export function* watcherSaga() {
  yield takeLatest(GET_USERS, handleGetUsers);
  yield takeLatest(GET_SENTTRANSACTIONS, handleGetSentTransactions);
  yield takeLatest(GET_RECEIVEDTRANSACTIONS, handleGetReceivedTransactions);
  yield takeLatest(GET_SENTTRANSACTIONS_BYID, handleGetSentTransactionsById);
  yield takeLatest(
    GET_RECEIVEDTRANSACTIONS_BYID,
    handleGetReceivedTransactionsById
  );
  yield takeEvery(GET_WALLETS_BYID, handleGetWalletsById);
}

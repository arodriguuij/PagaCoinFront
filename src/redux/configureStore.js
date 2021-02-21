import { combineReducers, createStore, applyMiddleware } from "redux";
import newUserReducer from "./ducks/newUser";
import transactionReducer from "./ducks/transaction";
import userReducer from "./ducks/user";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "../sagas/rootSaga";
import walletReducer from "./ducks/wallet";

const reducer = combineReducers({
  newUser: newUserReducer,
  user: userReducer,
  transactions: transactionReducer,
  wallets: walletReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga);

export default store;

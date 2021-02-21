export const GET_SENTTRANSACTIONS = "GET_SENTTRANSACTIONS";
const SET_SENTTRANSACTIONS = "SET_SENTTRANSACTIONS";
const RESET_SENTTRANSACTIONS = "RESET_SENTTRANSACTION";

export const GET_RECEIVEDTRANSACTIONS = "GET_RECEIVEDTRANSACTIONS";
const SET_RECEIVEDTRANSACTIONS = "SET_RECEIVEDTRANSACTIONS";
const RESET_RECEIVEDTRANSACTIONS = "RESET_RECEIVEDTRANSACTION";

export const GET_SENTTRANSACTIONS_BYID = "GET_SENTTRANSACTIONS_BYID";
const SET_SENTTRANSACTIONS_BYID = "SET_SENTTRANSACTIONS_BYID";
const RESET_SENTTRANSACTIONS_BYID = "RESET_SENTTRANSACTION_BYID";

export const GET_RECEIVEDTRANSACTIONS_BYID = "GET_RECEIVEDTRANSACTIONS_BYID";
const SET_RECEIVEDTRANSACTIONS_BYID = "SET_RECEIVEDTRANSACTIONS_BYID";
const RESET_RECEIVEDTRANSACTIONS_BYID = "RESET_RECEIVEDTRANSACTION_BYID";

export const getSentTransactions = (id) => ({
  type: GET_SENTTRANSACTIONS,
  id,
});
export const setSentTransactions = (sentTransactions) => ({
  type: SET_SENTTRANSACTIONS,
  sentTransactions,
});
export const resetSentTransactions = () => ({
  type: RESET_SENTTRANSACTIONS,
});

export const getReceivedTransactions = (id) => ({
  type: GET_RECEIVEDTRANSACTIONS,
  id,
});
export const setReceivedTransactions = (receivedTransactions) => ({
  type: SET_RECEIVEDTRANSACTIONS,
  receivedTransactions,
});
export const resetReceivedTransactions = () => ({
  type: RESET_RECEIVEDTRANSACTIONS,
});

export const getSentTransactionsById = (id) => ({
  type: GET_SENTTRANSACTIONS_BYID,
  id,
});
export const setSentTransactionsById = (sentTransactionsById) => ({
  type: SET_SENTTRANSACTIONS_BYID,
  sentTransactionsById,
});
export const resetSentTransactionsById = () => ({
  type: RESET_SENTTRANSACTIONS_BYID,
});

export const getReceivedTransactionsById = (id) => ({
  type: GET_RECEIVEDTRANSACTIONS_BYID,
  id,
});
export const setReceivedTransactionsById = (receivedTransactionsById) => ({
  type: SET_RECEIVEDTRANSACTIONS_BYID,
  receivedTransactionsById,
});
export const resetReceivedTransactionsById = () => ({
  type: RESET_RECEIVEDTRANSACTIONS_BYID,
});

const initialState = {
  sentTransactions: [],
  receivedTransactions: [],
  sentTransactionsById: [],
  receivedTransactionsById: [],
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SENTTRANSACTIONS:
      return { ...state, sentTransactions: action.sentTransactions };
    case RESET_SENTTRANSACTIONS:
      return { ...state, sentTransactions: [] };
    case SET_RECEIVEDTRANSACTIONS:
      return { ...state, receivedTransactions: action.receivedTransactions };
    case RESET_RECEIVEDTRANSACTIONS:
      return { ...state, receivedTransactions: [] };
    case SET_SENTTRANSACTIONS_BYID:
      return { ...state, sentTransactionsById: action.sentTransactionsById };
    case RESET_SENTTRANSACTIONS_BYID:
      return { ...state, sentTransactionsById: [] };
    case SET_RECEIVEDTRANSACTIONS_BYID:
      return {
        ...state,
        receivedTransactionsById: action.receivedTransactionsById,
      };
    case RESET_RECEIVEDTRANSACTIONS_BYID:
      return { ...state, receivedTransactionsById: [] };
    default:
      return state;
  }
};

export default transactionReducer;

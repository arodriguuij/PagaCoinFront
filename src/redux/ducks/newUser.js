// Actions
const SETUSERNAME = "setUserName";
const ADDWALLETIDS = "addWalletIds";
const RESETWALLETIDS = "resetWalletIds";
const ADDWALLET = "addWallet";
const RESETWALLETS = "resetWallets";
const SETWALLETNAME = "setWalletName";
const SETWALLETQUANTITY = "setWalletQuantity";
const RESET = "RESET";
const RESET_NEWWALLET = "RESET_NEWWALLET";
export const POST_USER = "POST_USER";

// Action Creators
export const setUserName = (name) => ({
  type: SETUSERNAME,
  name,
});
export const addWalletIds = (id) => ({
  type: ADDWALLETIDS,
  id,
});
export const resetWalletIds = () => ({
  type: RESETWALLETIDS,
});
export const addWallets = () => ({
  type: ADDWALLET,
});
export const resetWallets = () => ({
  type: RESETWALLETS,
});
export const setWalletName = (name) => ({
  type: SETWALLETNAME,
  name,
});
export const setWalletQuantity = (quantity) => ({
  type: SETWALLETQUANTITY,
  quantity,
});
export const postUser = (user) => ({
  type: POST_USER,
  user,
});
export const reset = () => ({
  type: RESET,
});
export const resetNewWallet = () => ({
  type: RESET_NEWWALLET,
});

// Reducer
const initialState = {
  name: "",
  walletIds: [],
  wallets: [],
  newWallet: {},
};

const newUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setUserName":
      return { ...state, name: action.name };
    case "addWalletIds":
      return { ...state, walletIds: [...state.walletIds, action.id] };
    case "resetWalletIds":
      return { ...state, walletIds: [] };
    case "addWallet":
      return { ...state, wallets: [...state.wallets, state.newWallet] };
    case "resetWallets":
      return { ...state, wallets: [] };
    case "setWalletName":
      return {
        ...state,
        newWallet: { ...state.newWallet, name: action.name },
      };
    case "setWalletQuantity":
      return {
        ...state,
        newWallet: { ...state.newWallet, quantity: action.quantity },
      };
    case RESET:
      return initialState;
    case RESET_NEWWALLET:
      return {
        ...state,
        newWallet: {},
      };
    default:
      return state;
  }
};

export default newUserReducer;

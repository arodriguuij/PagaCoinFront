export const GET_WALLETS_BYID = "GET_WALLETS_BYID";
const SET_WALLETS_BYID = "SET_WALLETS_BYID";
const RESET_WALLETS_BYID = "RESET_WALLETS_BYID";

export const getWalletsById = (id) => ({
  type: GET_WALLETS_BYID,
  id,
});
export const setWalletsById = (wallets) => ({
  type: SET_WALLETS_BYID,
  wallets,
});
export const resetWalletIds = () => ({
  type: RESET_WALLETS_BYID,
});

const initialState = {
  wallets: [],
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLETS_BYID:
      return { ...state, wallets: [...state.wallets, action.wallets[0]] };
    case RESET_WALLETS_BYID:
      return { ...state, wallets: [] };
    default:
      return state;
  }
};

export default walletReducer;

// Actions
export const GET_WALLETS_BYID = "GET_WALLETS_BYID";
export const GET_WALLETSFROM_BYID = "GET_WALLETSFROM_BYID";
export const GET_WALLETSTO_BYID = "GET_WALLETSTO_BYID";
export const UPDATE_WALLETFROM_BYID = "UPDATE_WALLETFROM_BYID";
export const UPDATE_WALLETTO_BYID = "UPDATE_WALLETTO_BYID";
const SET_WALLETS_BYID = "SET_WALLETS_BYID";
const SET_WALLETSFROM_BYID = "SET_WALLETSFROM_BYID";
const SET_WALLETSTO_BYID = "SET_WALLETSTO_BYID";
const SET_WALLETFROM_BYID = "SET_WALLETFROM_BYID";
const SET_WALLETTO_BYID = "SET_WALLETTO_BYID";
const RESET_WALLETS_BYID = "RESET_WALLETS_BYID";
const RESET_WALLETSFROM_BYID = "RESET_WALLETSFROM_BYID";
const RESET_WALLETSTO_BYID = "RESET_WALLETSTO_BYID";
const RESET_WALLETFROM_BYID = "RESET_WALLETFROM_BYID";
const RESET_WALLETTO_BYID = "RESET_WALLETSO_BYID";

// Action Creators
export const POST_WALLET = "POST_WALLET";
export const postWallet = ({ name, quantity }) => ({
  type: POST_WALLET,
  props: {
    name,
    quantity,
  },
});
export const getWalletsById = (id) => ({
  type: GET_WALLETS_BYID,
  id,
});
export const getWalletsFromById = (id) => ({
  type: GET_WALLETSFROM_BYID,
  id,
});
export const getWalletsToById = (id) => ({
  type: GET_WALLETSTO_BYID,
  id,
});
export const updateWalletFromById = (id, name, quantity) => ({
  type: UPDATE_WALLETFROM_BYID,
  props: {
    id,
    name,
    quantity,
  },
});
export const updateWalletToById = (id, name, quantity) => ({
  type: UPDATE_WALLETTO_BYID,
  props: {
    id,
    name,
    quantity,
  },
});
export const setWalletsById = (wallets) => ({
  type: SET_WALLETS_BYID,
  wallets,
});
export const setWalletsFromById = (wallets) => ({
  type: SET_WALLETSFROM_BYID,
  wallets,
});
export const setWalletsToById = (wallets) => ({
  type: SET_WALLETSTO_BYID,
  wallets,
});
export const setWalletFromById = (wallet) => ({
  type: SET_WALLETFROM_BYID,
  wallet,
});
export const setWalletToById = (wallet) => ({
  type: SET_WALLETTO_BYID,
  wallet,
});
export const resetWalletIds = () => ({
  type: RESET_WALLETS_BYID,
});
export const resetWalletsFromIds = () => ({
  type: RESET_WALLETSFROM_BYID,
});
export const resetWalletsToIds = () => ({
  type: RESET_WALLETSTO_BYID,
});
export const resetWalletFromIds = () => ({
  type: RESET_WALLETFROM_BYID,
});
export const resetWalletToIds = () => ({
  type: RESET_WALLETTO_BYID,
});

// Reducer
const initialState = {
  wallets: [],
  walletsFrom: [],
  walletsTo: [],
  walletFrom: null,
  walletTo: null,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLETS_BYID:
      return { ...state, wallets: [...state.wallets, action.wallets[0]] };
    case RESET_WALLETS_BYID:
      return { ...state, wallets: [] };
    case SET_WALLETSFROM_BYID:
      return {
        ...state,
        walletsFrom: [...state.walletsFrom, action.wallets[0]],
      };
    case SET_WALLETSTO_BYID:
      return { ...state, walletsTo: [...state.walletsTo, action.wallets[0]] };
    case SET_WALLETFROM_BYID:
      return {
        ...state,
        walletFrom: action.wallet,
      };
    case SET_WALLETTO_BYID:
      return { ...state, walletTo: action.wallet };
    case RESET_WALLETSFROM_BYID:
      return { ...state, walletsFrom: [] };
    case RESET_WALLETSTO_BYID:
      return { ...state, walletsTo: [] };
    case RESET_WALLETFROM_BYID:
      return { ...state, walletFrom: null };
    case RESET_WALLETTO_BYID:
      return { ...state, walletTo: null };
    default:
      return state;
  }
};

export default walletReducer;

import axios from "axios";
const port = 5000;
let path =
  window.location.protocol + "//" + window.location.hostname + ":" + port;

export function requestGetSentTransactions(id) {
  return axios.request({
    method: "get",
    url: path + "/transactions/sent/" + id,
  });
}

export function requestGetReceivedTransactions(id) {
  return axios.request({
    method: "get",
    url: path + "/transactions/received/" + id,
  });
}

export function requestGetSentTransactionsById(id) {
  return axios.request({
    method: "get",
    url: path + "/transactions/sentByWallet/" + id,
  });
}

export function requestGetReceivedTransactionsById(id) {
  return axios.request({
    method: "get",
    url: path + "/transactions/receivedByWallet/" + id,
  });
}
export function requestPostTransaction({
  userFromId,
  userFromName,
  walletFromId,
  walletFromName,
  userToId,
  userToName,
  walletToId,
  walletToName,
  quantity,
}) {
  var formData = new FormData();
  formData.append("userFromId", userFromId);
  formData.append("userFromName", userFromName);
  formData.append("walletFromId", walletFromId);
  formData.append("walletFromName", walletFromName);
  formData.append("userToId", userToId);
  formData.append("userToName", userToName);
  formData.append("walletToId", walletToId);
  formData.append("walletToName", walletToName);
  formData.append("quantity", quantity);

  return axios.request({
    method: "POST",
    url: path + "/transactions",
    body: formData,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      userFromId,
      userFromName,
      walletFromId,
      walletFromName,
      userToId,
      userToName,
      walletToId,
      walletToName,
      quantity,
    }),
  });
}

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

export function requestGeReceivedTransactionsById(id) {
  return axios.request({
    method: "get",
    url: path + "/transactions/receivedByWallet/" + id,
  });
}

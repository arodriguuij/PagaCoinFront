import axios from "axios";

const port = 5000;
let path =
  window.location.protocol + "//" + window.location.hostname + ":" + port;

export function requestGeWalletsById(id) {
  return axios.request({
    method: "get",
    url: path + "/wallets/" + id,
  });
}

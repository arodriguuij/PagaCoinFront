import axios from "axios";

const port = 5000;
let path =
  window.location.protocol + "//" + window.location.hostname + ":" + port;

export function requestGetUsers() {
  return axios.request({
    method: "get",
    url: path + "/users",
  });
}

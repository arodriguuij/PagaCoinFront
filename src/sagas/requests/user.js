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

export function requestPostUser(user) {
  var formData = new FormData();
  formData.append("name", user.name);
  formData.append("wallets", user.wallets);

  return axios.request({
    method: "POST",
    url: path + "/users",
    body: formData,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      name: user.name,
      wallets: user.wallets,
    }),
  });
}

import axios from "axios";

const port = 5000;
let path =
  window.location.protocol + "//" + window.location.hostname + ":" + port;

export function requestGetWalletsByHashId(id) {
  console.log(path + "/wallets/ByHashId/" + id);
  return axios.request({
    method: "get",
    url: path + "/wallets/ByHashId/" + id,
  });
}
export function requestPostWallet(name, quantity) {
  var formData = new FormData();
  formData.append("name", name);
  formData.append("quantity", quantity);

  return axios.request({
    method: "POST",
    url: path + "/wallets",
    body: formData,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      name: name,
      quantity: quantity,
    }),
  });
}

export function requestUpdateWalletByHashId(id, name, quantity) {
  var formData = new FormData();
  formData.append("name", name);
  formData.append("quantity", quantity);

  return axios.request({
    method: "PATCH",
    url: path + "/wallets/" + id,
    body: formData,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      name,
      quantity,
    }),
  });
}

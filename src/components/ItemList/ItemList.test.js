import React from "react";
import ItemList from "./ItemList";
import pagaCoinRender from "../../test-utils";

const items = [
  {
    name: "User1",
    wallets: [
      "0740591d205e5298fd91310ce74b03a2f3d736ac",
      "bcdc867e0482a7dd6cb9d4b4e4bf4174bc7f8b54",
    ],
    _id: "6032b541819ce268fcdc08a0",
  },
  {
    name: "User2",
    wallets: ["2fe88e0e6256f85a882ea1648c5da37f96cd763f"],
    _id: "6032b573819ce268fcdc08a2",
  },
  {
    name: "user3",
    wallets: [
      "e507f81d48d4663ee0a890756a5cc501d17cc909",
      "ba9c1ba79bc4416338b3cd1241410f60def4ab21",
      "d7445c1fc8c6a8911058437ab70dd091bf4e0cca",
    ],
    _id: "6032b58b819ce268fcdc08a6",
  },
];

describe("ItemList", () => {
  test("renderes the correct content", () => {
    pagaCoinRender(
      <ItemList
        items={items}
        onHandleSelect={() => {}}
        onHandleTransactionsByWallets={() => {}}
        onHandleAllTransactions={() => {}}
        show={"name"}
        title={"Users"}
        type={"simple"}
      />
    );
  });
});

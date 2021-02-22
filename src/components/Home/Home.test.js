import React from "react";
import Home from "./Home";
import TransferCoin from "../transferCoin/TransferCoin";
import pagaCoinRender from "../../test-utils";

describe("Home", () => {
  test("renderes the correct content", () => {
    pagaCoinRender(
      <Home>
        <TransferCoin />
      </Home>
    );
  });
});

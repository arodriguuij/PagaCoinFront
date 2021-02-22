import React from "react";
import pagaCoinRender from "../../test-utils";
import TransferCoin from "./TransferCoin";

describe("TransferCoin", () => {
  test("renderes the correct content", () => {
    pagaCoinRender(<TransferCoin />);
  });
});

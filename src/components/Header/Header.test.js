import React from "react";
import Header from "./Header";
import pagaCoinRender from "../../test-utils";

describe("Header", () => {
  test("renderes the correct content", () => {
    pagaCoinRender(<Header />);
  });
});

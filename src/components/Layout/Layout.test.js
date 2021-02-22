import React from "react";
import Layout from "./Layout";
import pagaCoinRender from "../../test-utils";

describe("Layout", () => {
  test("renderes the correct content", () => {
    pagaCoinRender(<Layout />);
  });
});

import React from "react";
import pagaCoinRender, { fireEvent } from "../../test-utils";
import UserAndWalletsCreation from "./UserAndWalletsCreation";
import { screen } from "@testing-library/react";

describe("UserAndWalletsCreation", () => {
  test("renderes the correct content", () => {
    pagaCoinRender(<UserAndWalletsCreation />);
  });
  test("renderes the UserCreation component", () => {
    pagaCoinRender(<UserAndWalletsCreation />);
    const inputUserName = screen.getByLabelText("user-name");
    expect(inputUserName).toBeInTheDocument();
  });
  test("clicks the submit user button", () => {
    pagaCoinRender(<UserAndWalletsCreation />);
    const button = screen.getByTestId("submit-user");
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
    /* expect(showWallet).toHaveBeenCalledTimes(1); */
  });
});

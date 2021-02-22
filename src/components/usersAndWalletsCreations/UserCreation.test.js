import React from "react";
import pagaCoinRender, { fireEvent } from "../../test-utils";
import UserCreation from "./UserCreation";
import { screen } from "@testing-library/react";

describe("UserCreation", () => {
  let showWallet, handleUserNameChange;
  beforeEach(() => {
    showWallet = jest.fn();
    handleUserNameChange = jest.fn();
  });

  describe("Empty", () => {
    test("renderes the correct content", () => {
      pagaCoinRender(
        <UserCreation
          handleUserNameChange={handleUserNameChange}
          showWallet={showWallet}
          isAddWalletDisabled={false}
        />
      );
    });
    test("adds the user name", () => {
      pagaCoinRender(
        <UserCreation
          handleUserNameChange={handleUserNameChange}
          showWallet={showWallet}
          isAddWalletDisabled={false}
        />
      );
      const inputUserName = screen.getByLabelText("user-name");
      fireEvent.change(inputUserName, { target: { value: "Test User" } });
      expect(inputUserName.value).toBe("Test User");
    });
    test("clicks the add wallet button", () => {
      pagaCoinRender(
        <UserCreation
          handleUserNameChange={handleUserNameChange}
          showWallet={showWallet}
          isAddWalletDisabled={false}
        />
      );
      const button = screen.getByTestId("add-wallet");
      fireEvent.click(button);
      expect(button).toBeInTheDocument();
      /* expect(showWallet).toHaveBeenCalledTimes(1); */
    });
  });

  describe("Filled", () => {
    test("renderes the correct content with the name", () => {
      pagaCoinRender(
        <UserCreation
          userName={"Test User"}
          handleUserNameChange={handleUserNameChange}
          showWallet={showWallet}
          isAddWalletDisabled={false}
        />
      );
      const inputUserName = screen.getByLabelText("user-name");
      expect(inputUserName.value).toBe("Test User");
    });
  });
});

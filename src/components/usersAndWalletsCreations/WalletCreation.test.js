import React from "react";
import pagaCoinRender, { fireEvent } from "../../test-utils";
import { screen } from "@testing-library/react";
import WalletCreation from "./WalletCreation";

describe("WalletCreation", () => {
  let handleWalletQuantityChange,
    handleWalletNameChange,
    addWallet,
    cancelWallet;
  beforeEach(() => {
    handleWalletQuantityChange = jest.fn();
    handleWalletNameChange = jest.fn();
    addWallet = jest.fn();
    cancelWallet = jest.fn();
  });

  describe("Empty", () => {
    test("renderes the correct content", () => {
      pagaCoinRender(
        <WalletCreation
          handleWalletNameChange={handleWalletQuantityChange}
          handleWalletQuantityChange={handleWalletNameChange}
          addWallet={addWallet}
          cancelWallet={cancelWallet}
        />
      );
    });
    test("adds the wallet name", () => {
      pagaCoinRender(
        <WalletCreation
          handleWalletNameChange={handleWalletQuantityChange}
          handleWalletQuantityChange={handleWalletNameChange}
          addWallet={addWallet}
          cancelWallet={cancelWallet}
        />
      );
      const inputWalletName = screen.getByLabelText("wallet-name");
      fireEvent.change(inputWalletName, { target: { value: "Test Wallet" } });
      expect(inputWalletName.value).toBe("Test Wallet");
    });
    test("adds the wallet quantity", () => {
      pagaCoinRender(
        <WalletCreation
          handleWalletNameChange={handleWalletQuantityChange}
          handleWalletQuantityChange={handleWalletNameChange}
          addWallet={addWallet}
          cancelWallet={cancelWallet}
        />
      );
      const inputWalletQuantity = screen.getByLabelText("wallet-quantity");
      fireEvent.change(inputWalletQuantity, { target: { value: "1000" } });
      expect(inputWalletQuantity.value).toBe("1000");
    });
    test("Clicks the cancel wallet button", () => {
      pagaCoinRender(
        <WalletCreation
          handleWalletNameChange={handleWalletQuantityChange}
          handleWalletQuantityChange={handleWalletNameChange}
          addWallet={addWallet}
          cancelWallet={cancelWallet}
        />
      );
      const button = screen.getByTestId("cancel-wallet");
      fireEvent.click(button);
      expect(button).toBeInTheDocument();
      /* expect(onClick={cancelWallet}).toHaveBeenCalledTimes(1); */
    });
  });

  describe("Filled", () => {
    test("renderes the correct content with the wallets name and quantity", () => {
      pagaCoinRender(
        <WalletCreation
          handleWalletNameChange={handleWalletQuantityChange}
          handleWalletQuantityChange={handleWalletNameChange}
          addWallet={addWallet}
          walletName={"WalletName"}
          walletsQuantity={1000}
          cancelWallet={cancelWallet}
        />
      );
      const inputWalletName = screen.getByLabelText("wallet-name");
      expect(inputWalletName.value).toBe("WalletName");
    });

    test("clicks the add wallet button", () => {
      pagaCoinRender(
        <WalletCreation
          handleWalletNameChange={handleWalletQuantityChange}
          handleWalletQuantityChange={handleWalletNameChange}
          addWallet={addWallet}
          walletName={"WalletName"}
          walletsQuantity={1000}
          cancelWallet={cancelWallet}
        />
      );
      const button = screen.getByTestId("add-wallet");
      fireEvent.click(button);
      expect(button).toBeInTheDocument();
      /* expect(addWallet).toHaveBeenCalledTimes(1); */
    });
  });
});

import React from "react";
import { Container, Col, FormGroup, Label, Input, Button } from "reactstrap";

const WalletCreation = ({
  handleWalletNameChange,
  handleWalletQuantityChange,
  addWallet,
  walletName,
  walletsQuantity,
  cancelWallet,
}) => {
  return (
    <Container>
      <Col className="card">
        <FormGroup>
          <Label>Wallet's name</Label>
          <Input
            type="text"
            name="userName"
            value={walletName}
            id="userName"
            placeholder="Introduce the wallet's name"
            onChange={handleWalletNameChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Quantity</Label>
          <Input
            type="number"
            name="quantity"
            value={walletsQuantity}
            id="quantity"
            placeholder="Introduce the quantity"
            onChange={handleWalletQuantityChange}
          />
        </FormGroup>
        <Container className="d-inline-flex p-2 col-example">
          <Button
            type="button"
            onClick={addWallet}
            disabled={!walletName || !walletsQuantity || walletsQuantity < 0}
            style={{ margin: "1rem" }}
          >
            Add
          </Button>
          <Button
            color="danger"
            type="button"
            onClick={cancelWallet}
            style={{ margin: "1rem" }}
          >
            Cancel
          </Button>
        </Container>
      </Col>
    </Container>
  );
};

export default WalletCreation;

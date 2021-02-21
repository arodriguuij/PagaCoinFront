import React from "react";
import { Container, Col, FormGroup, Label, Input, Button } from "reactstrap";

const UserCreation = ({
  userName,
  handleUserNameChange,
  showWallet,
  isAddWalletDisabled,
}) => {
  return (
    <Container>
      <Col>
        <FormGroup>
          <Label>User name</Label>
          <Input
            type="text"
            name="userName"
            id="userName"
            placeholder="Introduce your name"
            value={userName}
            onChange={handleUserNameChange}
          />
        </FormGroup>
      </Col>
      <Button type="button" onClick={showWallet} disabled={isAddWalletDisabled}>
        Add wallet
      </Button>
    </Container>
  );
};

export default UserCreation;

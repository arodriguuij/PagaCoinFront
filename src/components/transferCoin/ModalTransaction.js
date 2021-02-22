import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  Input,
} from "reactstrap";

const ModalTransaction = ({
  modal,
  toggleModal,
  title,
  selectedWalletsFrom,
  makeTransaction,
  size,
}) => {
  const [quantityToSend, setQuantityToSend] = useState(0);

  const handleQuantityChange = (e) => {
    setQuantityToSend(e.target.value);
  };
  const onMakeTransaction = () => {
    if (
      quantityToSend !== 0 &&
      quantityToSend <= selectedWalletsFrom?.quantity
    ) {
      makeTransaction(quantityToSend);
    }
  };

  return (
    <Modal
      isOpen={modal}
      toggle={toggleModal}
      className={"className"}
      size={size}
    >
      <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
      <ModalBody>
        <InputGroup>
          <InputGroupAddon addonType="prepend">$</InputGroupAddon>
          <Input
            placeholder="Amount"
            min={0}
            max={selectedWalletsFrom?.quantity}
            type="number"
            step="1"
            onChange={handleQuantityChange}
          />
          <InputGroupAddon addonType="append">.00</InputGroupAddon>
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            onMakeTransaction();
            toggleModal();
          }}
          disabled={
            quantityToSend <= 0 || quantityToSend > selectedWalletsFrom.quantity
          }
        >
          Make transaction
        </Button>
        <Button color="secondary" onClick={toggleModal}>
          Cancel transaction
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalTransaction;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import ItemList from "../ItemList";
import ModalTransaction from "./ModalTransaction";
import { CircularProgress } from "@material-ui/core";
import { Container, Button } from "reactstrap";
import {
  getWalletsFromById,
  getWalletsToById,
  resetWalletsFromIds,
  resetWalletsToIds,
} from "../../redux/ducks/wallet";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/ducks/user";
import {
  updateWalletToById,
  updateWalletFromById,
} from "./../../redux/ducks/wallet";
import { postTransaction } from "../../redux/ducks/transaction";

const TransferCoin = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { walletsFrom, walletsTo, wallets } = useSelector(
    (state) => state.wallets
  );
  const users = useSelector((state) => state.user.users);

  const [selectedUserFrom, setSelectedUserFrom] = useState("");
  const [selectedUserTo, setSelectedUserTo] = useState("");
  const [toggleFrom, setToggleFrom] = useState(false);
  const [toggleTo, setToggleTo] = useState(false);
  const [selectedWalletsFrom, setSelectedWalletsFrom] = useState("");
  const [selectedWalletsTo, setSelectedWalletsTo] = useState("");

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const handleSelectUserFrom = (user) => {
    dispatch(resetWalletsFromIds());
    setToggleFrom((prevState) => !prevState);
    setSelectedUserFrom(user);
    setSelectedWalletsFrom("");
  };
  const handleSelectWalletFrom = (wallet) => {
    setSelectedWalletsFrom(wallet);
    setSelectedWalletsTo("");
    setSelectedUserTo("");
  };
  const handleSelectUserTo = (user) => {
    dispatch(resetWalletsToIds());
    setToggleTo((prevState) => !prevState);
    setSelectedUserTo(user);
    setSelectedWalletsTo("");
  };
  const handleSelectWalletTo = (wallet) => {
    setSelectedWalletsTo(wallet);
  };

  const makeTransaction = async (quantity) => {
    dispatch(
      updateWalletFromById(
        selectedWalletsFrom._id,
        selectedWalletsFrom.name,
        selectedWalletsFrom.quantity - parseInt(quantity)
      )
    );
    dispatch(
      updateWalletToById(
        selectedWalletsTo._id,
        selectedWalletsTo.name,
        selectedWalletsTo.quantity + parseInt(quantity)
      )
    );
    dispatch(
      postTransaction({
        userFromId: selectedUserFrom._id,
        userFromName: selectedUserFrom.name,
        walletFromId: selectedWalletsFrom.id,
        walletFromName: selectedWalletsFrom.name,
        userToId: selectedUserTo._id,
        userToName: selectedUserTo.name,
        walletToId: selectedWalletsTo.id,
        walletToName: selectedWalletsTo.name,
        quantity: parseInt(quantity),
      })
    );
    history.push("/transactions");
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (selectedUserTo) {
      selectedUserTo.wallets.map((wallet) => {
        dispatch(getWalletsToById(wallet));
      });
    }
  }, [selectedUserTo, toggleTo]);

  useEffect(() => {
    if (selectedUserFrom) {
      selectedUserFrom.wallets.map((wallet) => {
        dispatch(getWalletsFromById(wallet));
      });
    }
  }, [selectedUserFrom, toggleFrom]);

  const externalCloseBtn = (
    <button
      className="close"
      style={{ position: "absolute", top: "15px", right: "15px" }}
      onClick={toggleModal}
    >
      &times;
    </button>
  );

  console.log(
    "walletsFrom, walletsTo ",
    walletsFrom,
    walletsTo,
    wallets,
    users
  );
  return !users ? (
    <CircularProgress />
  ) : (
    <>
      <h1>Transfer PageCoin</h1>
      <Container className="d-inline-flex p-2 col-example">
        <div className="card">
          <ItemList
            items={users}
            onHandleSelect={handleSelectUserFrom}
            title={"Step 1/5"}
            titleExtra={"Sending user"}
            show={"name"}
            type={"simple"}
          />
        </div>
        {selectedUserFrom && walletsFrom && (
          <div className="card">
            <ItemList
              items={walletsFrom}
              onHandleSelect={handleSelectWalletFrom}
              title={"Step 2/5"}
              titleExtra={`${selectedUserFrom.name}'s wallets`}
              show={"name"}
              showMore={"quantity"}
              type={"double"}
              color="info"
            />
          </div>
        )}
        {selectedUserFrom && walletsFrom && selectedWalletsFrom && (
          <div className="card">
            <ItemList
              items={users.filter((user) => user._id !== selectedUserFrom._id)}
              onHandleSelect={handleSelectUserTo}
              title={"Step 3/5"}
              titleExtra={"Reciving user"}
              show={"name"}
              type={"simple"}
            />
          </div>
        )}
        {selectedUserFrom &&
          walletsFrom &&
          selectedWalletsFrom &&
          selectedUserTo &&
          walletsTo && (
            <div className="card">
              <ItemList
                items={walletsTo}
                onHandleSelect={handleSelectWalletTo}
                titleExtra={`${selectedUserTo.name}'s wallets`}
                title={"Step 4/5"}
                show={"name"}
                showMore={"quantity"}
                type={"double"}
                color="info"
              />
            </div>
          )}
        {selectedUserFrom &&
          walletsFrom &&
          selectedWalletsFrom &&
          selectedUserTo &&
          walletsTo &&
          selectedWalletsTo && (
            <div className="card">
              <Container className="App">
                <h4>Step 5/5 </h4> <p>Transaction</p>
                <Button
                  color="danger"
                  style={{ height: "fit-content", width: "100%" }}
                  onClick={toggleModal}
                >
                  Start Transaction
                </Button>
              </Container>
            </div>
          )}
        <ModalTransaction
          modal={modal}
          toggleModal={toggleModal}
          className={""}
          size="lg"
          title={`Transaction from [${selectedWalletsFrom.name}] ${selectedUserFrom?.name}'s wallet to [${selectedWalletsTo.name}] ${selectedUserTo?.name}'s wallet`}
          external={externalCloseBtn}
          selectedWalletsFrom={selectedWalletsFrom}
          makeTransaction={makeTransaction}
        />
      </Container>
    </>
  );
};

export default TransferCoin;

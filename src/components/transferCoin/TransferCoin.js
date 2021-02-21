import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import ItemList from "../ItemList";
import ModalTransaction from "./ModalTransaction";

import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { Container, Button } from "reactstrap";

const TransferCoin = () => {
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [selectedUserFrom, setSelectedUserFrom] = useState("");
  const [selectedUserTo, setSelectedUserTo] = useState("");
  const [toggleFrom, setToggleFrom] = useState(false);
  const [toggleTo, setToggleTo] = useState(false);
  const [walletsFrom, setWalletsFrom] = useState([]);
  const [walletsTo, setWalletsTo] = useState([]);
  const [selectedWalletsFrom, setSelectedWalletsFrom] = useState("");
  const [selectedWalletsTo, setSelectedWalletsTo] = useState("");

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const handleSelectUserFrom = (user) => {
    setWalletsFrom([]);
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
    setWalletsTo([]);
    setToggleTo((prevState) => !prevState);
    setSelectedUserTo(user);
    setSelectedWalletsTo("");
  };
  const handleSelectWalletTo = (wallet) => {
    setSelectedWalletsTo(wallet);
  };

  const fetchUsers = async () => {
    try {
      const users = await axios.get("/users");
      setUsers(users.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchWalletTo = async (walletId) => {
    try {
      const wallet = await axios.get("/wallets/ByHashId/" + walletId);
      setWalletsTo((prevState) => [...prevState, wallet.data[0]]);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchWalletFrom = async (walletId) => {
    try {
      const wallet = await axios.get("/wallets/ByHashId/" + walletId);
      setWalletsFrom((prevState) => [...prevState, wallet.data[0]]);
    } catch (error) {
      console.log(error);
    }
  };
  const updateWalletFrom = async (quantity) => {
    try {
      await axios.patch("/wallets/ByHashId/" + selectedWalletsFrom._id, {
        name: selectedWalletsFrom.name,
        quantity: selectedWalletsFrom.quantity - parseInt(quantity),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateWalletTo = async (quantity) => {
    try {
      await axios.patch("/wallets/ByHashId/" + selectedWalletsTo._id, {
        name: selectedWalletsTo.name,
        quantity: selectedWalletsTo.quantity + parseInt(quantity),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const postTransaction = async (quantity) => {
    try {
      await axios.post("/transactions", {
        userFromId: selectedUserFrom._id,
        userFromName: selectedUserFrom.name,
        walletFromId: selectedWalletsFrom.id,
        walletFromName: selectedWalletsFrom.name,
        userToId: selectedUserTo._id,
        userToName: selectedUserTo.name,
        walletToId: selectedWalletsTo.id,
        walletToName: selectedWalletsTo.name,
        quantity: parseInt(quantity),
      });
    } catch (error) {
      console.log(error);
    } finally {
      history.push("/transactions");
    }
  };
  const makeTransaction = async (quantity) => {
    updateWalletFrom(quantity);
    updateWalletTo(quantity);
    postTransaction(quantity);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUserTo) {
      selectedUserTo.wallets.map((wallet) => {
        fetchWalletTo(wallet);
      });
    }
  }, [selectedUserTo, toggleTo]);

  useEffect(() => {
    if (selectedUserFrom) {
      selectedUserFrom.wallets.map((wallet) => {
        fetchWalletFrom(wallet);
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

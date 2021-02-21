import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import ItemList from "../ItemList";
import { Container } from "reactstrap";

const Transactions = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserFrom, setSelectedUserFrom] = useState("");
  const [toggleFrom, setToggleFrom] = useState(false);
  const [receivedtransactions, setReceivedTransactions] = useState([]);
  const [sentTransactions, setSentTransactions] = useState([]);
  const [
    receivedtransactionsByWallet,
    setReceivedTransactionsByWallet,
  ] = useState([]);
  const [sentTransactionsByWallet, setSentTransactionsByWallet] = useState([]);
  const [isTransactions, setIsTransactions] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [isWalletClicked, setIsWalletClicked] = useState(false);

  const handleSelectUserFrom = (user, type) => {
    setIsTransactions(type === "transactions");
    setToggleFrom((prevState) => !prevState);
    setSelectedUserFrom(user);
    setWallets([]);
    setReceivedTransactions([]);
    setSentTransactions([]);
    setReceivedTransactionsByWallet([]);
    setSentTransactionsByWallet([]);
    setIsWalletClicked(false);
  };

  const handleWalletSelect = async (wallet) => {
    if (isTransactions === false) {
      setIsWalletClicked(true);
      fetchSentByWallet(wallet.id);
      fetchReceivedByWallet(wallet.id);
    }
  };

  const fetchUsers = async () => {
    try {
      const users = await axios.get("/users");
      setUsers(users.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSentTransactions = async () => {
    try {
      const transactions = await axios.get(
        "/transactions/sent/" + selectedUserFrom._id
      );
      setReceivedTransactions(transactions.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchReceivedTransactions = async () => {
    try {
      const transactions = await axios.get(
        "/transactions/received/" + selectedUserFrom._id
      );
      setSentTransactions(transactions.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchWallets = async (walletId) => {
    try {
      const wallet = await axios.get("/wallets/" + walletId);
      setWallets((prevState) => [...prevState, wallet.data[0]]);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSentByWallet = async (id) => {
    try {
      const transactions = await axios.get("/transactions/sentByWallet/" + id);
      setReceivedTransactionsByWallet(transactions.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchReceivedByWallet = async (id) => {
    try {
      const transactions = await axios.get(
        "/transactions/receivedByWallet/" + id
      );
      setSentTransactionsByWallet(transactions.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUserFrom) {
      if (isTransactions) {
        fetchSentTransactions();
        fetchReceivedTransactions();
      } else {
        selectedUserFrom.wallets.map((wallet) => {
          fetchWallets(wallet);
        });
      }
    }
  }, [selectedUserFrom, toggleFrom, isTransactions]);

  return !users ? (
    <CircularProgress />
  ) : (
    <>
      <h1>Transactions and Balances</h1>
      <Container className="d-inline-flex p-2 col-example">
        <div className="card">
          <ItemList
            items={users}
            onHandleSelect={() => {}}
            onHandleTransactionsByWallets={handleSelectUserFrom}
            onHandleAllTransactions={handleSelectUserFrom}
            titleExtra={"Users"}
            show={"name"}
          />
        </div>
        {selectedUserFrom &&
        (isTransactions
          ? receivedtransactions.length > 0 || sentTransactions.length > 0
          : wallets.length) ? (
          <div className="card">
            <ItemList
              items={isTransactions ? receivedtransactions : wallets}
              onHandleSelect={handleWalletSelect}
              title={`${selectedUserFrom.name}'s ${
                isTransactions
                  ? "transactions"
                  : `wallets [${wallets.reduce(
                      (acc, obj) => acc + obj.quantity,
                      0
                    )}$]`
              } `}
              show={"name"}
              showMore={"quantity"}
              type={isTransactions ? "transactions" : "double"}
              color="danger"
            />
            {isTransactions && (
              <ItemList
                items={sentTransactions}
                onHandleSelect={() => {}}
                show={"name"}
                showMore={"quantity"}
                type="transactions"
                color="success"
              />
            )}
          </div>
        ) : (
          selectedUserFrom && (
            <div className="card">
              <h4>{isTransactions ? "Transactions" : "Wallets"}</h4>
              <p>
                {selectedUserFrom.name} has no{" "}
                {isTransactions ? "transactions" : "wallets"}
              </p>
            </div>
          )
        )}
        {selectedUserFrom &&
          (receivedtransactionsByWallet.length > 0 ||
            sentTransactionsByWallet.length > 0) &&
          !isTransactions && (
            <div className="card">
              <ItemList
                items={receivedtransactionsByWallet}
                onHandleSelect={() => {}}
                title={`${selectedUserFrom.name}'s transactions`}
                show={"name"}
                showMore={"quantity"}
                type={"transactions"}
                color="danger"
              />
              <ItemList
                items={sentTransactionsByWallet}
                onHandleSelect={() => {}}
                show={"name"}
                showMore={"quantity"}
                type="transactions"
                color="success"
              />
            </div>
          )}
        {selectedUserFrom &&
          receivedtransactionsByWallet.length === 0 &&
          sentTransactionsByWallet.length === 0 &&
          isWalletClicked &&
          !isTransactions && (
            <div className="card">
              <h4>Wallets</h4>
              <p>{selectedUserFrom.name} has no transactions</p>
            </div>
          )}
      </Container>
    </>
  );
};

export default Transactions;

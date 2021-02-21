import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import ItemList from "../ItemList";
import { Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/ducks/user";
import {
  getSentTransactions,
  resetSentTransactions,
  getReceivedTransactions,
  resetReceivedTransactions,
  getSentTransactionsById,
  resetSentTransactionsById,
  getReceivedTransactionsById,
  resetReceivedTransactionsById,
} from "../../redux/ducks/transaction";
import { getWalletsById, resetWalletIds } from "../../redux/ducks/wallet";

const Transactions = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const {
    sentTransactions,
    receivedTransactions,
    sentTransactionsById,
    receivedTransactionsById,
  } = useSelector((state) => state.transactions);
  const wallets = useSelector((state) => state.wallets.wallets);

  const [selectedUserFrom, setSelectedUserFrom] = useState("");
  const [toggleFrom, setToggleFrom] = useState(false);
  const [isTransactions, setIsTransactions] = useState(false);
  const [isWalletClicked, setIsWalletClicked] = useState(false);

  const handleSelectUserFrom = (user, type) => {
    setIsTransactions(type === "transactions");
    setToggleFrom((prevState) => !prevState);
    setSelectedUserFrom(user);
    dispatch(resetWalletIds());
    dispatch(resetSentTransactions());
    dispatch(resetReceivedTransactions());
    dispatch(resetSentTransactionsById());
    dispatch(resetReceivedTransactionsById());
    setIsWalletClicked(false);
  };

  const handleWalletSelect = async (wallet) => {
    if (isTransactions === false) {
      setIsWalletClicked(true);
      dispatch(getSentTransactionsById(wallet.id));
      dispatch(getReceivedTransactionsById(wallet.id));
    }
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (selectedUserFrom) {
      if (isTransactions) {
        dispatch(getSentTransactions(selectedUserFrom._id));
        dispatch(getReceivedTransactions(selectedUserFrom._id));
      } else {
        selectedUserFrom.wallets.map((wallet) => {
          dispatch(getWalletsById(wallet));
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
          ? receivedTransactions.length > 0 || sentTransactions.length > 0
          : wallets.length) ? (
          <div className="card">
            <ItemList
              items={isTransactions ? sentTransactions : wallets}
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
                items={receivedTransactions}
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
          (sentTransactionsById.length > 0 ||
            receivedTransactionsById.length > 0) &&
          !isTransactions && (
            <div className="card">
              <ItemList
                items={sentTransactionsById}
                onHandleSelect={() => {}}
                title={`${selectedUserFrom.name}'s transactions`}
                show={"name"}
                showMore={"quantity"}
                type={"transactions"}
                color="danger"
              />
              <ItemList
                items={receivedTransactionsById}
                onHandleSelect={() => {}}
                show={"name"}
                showMore={"quantity"}
                type="transactions"
                color="success"
              />
            </div>
          )}
        {selectedUserFrom &&
          sentTransactionsById.length === 0 &&
          receivedTransactionsById.length === 0 &&
          isWalletClicked &&
          !isTransactions && (
            <div className="card">
              <h4>Wallets</h4>
              <p>
                {selectedUserFrom.name} has no transactions with this wallet
              </p>
            </div>
          )}
      </Container>
    </>
  );
};

export default Transactions;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import ItemList from "../ItemList/ItemList";
import ModalTransaction from "./ModalTransaction";
import { CircularProgress } from "@material-ui/core";
import { Container, Button } from "reactstrap";
import {
  getWalletsFromById,
  getWalletsToById,
  resetWalletsFromIds,
  resetWalletsToIds,
  setWalletFromById,
  setWalletToById,
  resetWalletFromIds,
  resetWalletToIds,
  resetWalletIds,
} from "../../redux/ducks/wallet";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  resetUserFrom,
  resetUserTo,
  setUserFrom,
  setUserTo,
} from "../../redux/ducks/user";
import {
  updateWalletToById,
  updateWalletFromById,
} from "./../../redux/ducks/wallet";
import { postTransaction } from "../../redux/ducks/transaction";

const TransferCoin = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { walletsFrom, walletsTo, walletFrom, walletTo } = useSelector(
    (state) => state.wallets
  );
  const { users, userFrom, userTo } = useSelector((state) => state.user);

  const [toggleFrom, setToggleFrom] = useState(false);
  const [toggleTo, setToggleTo] = useState(false);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const secuence = () => (
    <h3>
      {`${userFrom?.name ? userFrom.name : ""} 
    ${walletFrom?.name ? walletFrom.name : ""} 
    ${userTo?.name ? userTo.name : ""} 
    ${walletTo?.name ? walletTo.name : ""}`}
    </h3>
  );

  const handleSelectUserFrom = (user) => {
    dispatch(resetWalletFromIds());
    dispatch(resetWalletToIds());
    dispatch(resetWalletFromIds());
    dispatch(resetWalletsFromIds());
    setToggleFrom((prevState) => !prevState);
    dispatch(setUserFrom(user));
  };
  const handleSelectWalletFrom = (wallet) => {
    dispatch(setWalletFromById(wallet));
    dispatch(setWalletFromById(wallet));
    dispatch(resetWalletToIds());
    dispatch(resetUserTo());
  };
  const handleSelectUserTo = (user) => {
    dispatch(resetWalletsToIds());
    dispatch(resetWalletToIds());
    setToggleTo((prevState) => !prevState);
    dispatch(setUserTo(user));
  };
  const handleSelectWalletTo = (wallet) => {
    dispatch(setWalletToById(wallet));
  };
  const restart = () => {
    dispatch(resetWalletFromIds());
    dispatch(resetWalletToIds());
    dispatch(resetWalletIds());
    dispatch(resetWalletsToIds());
    dispatch(resetWalletsFromIds());
    dispatch(resetUserFrom());
    dispatch(resetUserTo());
  };

  const makeTransaction = (quantity) => {
    dispatch(
      updateWalletFromById(
        walletFrom._id,
        walletFrom.name,
        walletFrom.quantity - parseInt(quantity)
      )
    );
    dispatch(
      updateWalletToById(
        walletTo._id,
        walletTo.name,
        walletTo.quantity + parseInt(quantity)
      )
    );
    dispatch(
      postTransaction({
        userFromId: userFrom._id,
        userFromName: userFrom.name,
        walletFromId: walletFrom.id,
        walletFromName: walletFrom.name,
        userToId: userTo._id,
        userToName: userTo.name,
        walletToId: walletTo.id,
        walletToName: walletTo.name,
        quantity: parseInt(quantity),
      })
    );
    restart();
    history.push("/transactions");
  };

  useEffect(() => {
    if (!users.length) dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (userTo && !walletsTo.length) {
      userTo.wallets.map((wallet) => {
        dispatch(getWalletsToById(wallet));
      });
    }
  }, [userTo, toggleTo]);

  useEffect(() => {
    if (userFrom && !walletsFrom.length) {
      userFrom.wallets.map((wallet) => {
        dispatch(getWalletsFromById(wallet));
      });
    }
  }, [userFrom, toggleFrom]);

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
      {secuence()}
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
        {walletsFrom.length > 0 && (
          <div className="card">
            <ItemList
              items={walletsFrom}
              onHandleSelect={handleSelectWalletFrom}
              title={"Step 2/5"}
              titleExtra={`${userFrom.name}'s wallets`}
              show={"name"}
              showMore={"quantity"}
              showExtraMore={"id"}
              type={"triple"}
              color="info"
            />
          </div>
        )}
        {walletsFrom.length > 0 && walletFrom && (
          <div className="card">
            <ItemList
              items={users.filter((user) => user._id !== userFrom._id)}
              onHandleSelect={handleSelectUserTo}
              title={"Step 3/5"}
              titleExtra={"Reciving user"}
              show={"name"}
              type={"simple"}
            />
          </div>
        )}
        {userFrom && walletsFrom && walletFrom && userTo && walletsTo && (
          <div className="card">
            <ItemList
              items={walletsTo}
              onHandleSelect={handleSelectWalletTo}
              titleExtra={`${userTo.name}'s wallets`}
              title={"Step 4/5"}
              show={"name"}
              showMore={"quantity"}
              showExtraMore={"id"}
              type={"triple"}
              color="info"
            />
          </div>
        )}
        {userFrom &&
          walletsFrom &&
          walletFrom &&
          userTo &&
          walletsTo &&
          walletTo && (
            <div className="card">
              <Container className="App">
                <h4>Step 5/5 </h4> <p>Transaction</p>
                <Button
                  color="primary"
                  style={{
                    height: "fit-content",
                    width: "100%",
                    margin: "0.5rem",
                  }}
                  onClick={toggleModal}
                >
                  Start Transaction
                </Button>
                <Button
                  color="danger"
                  style={{
                    height: "fit-content",
                    width: "100%",
                    margin: "0.5rem",
                  }}
                  onClick={restart}
                >
                  Cancel Transaction
                </Button>
              </Container>
            </div>
          )}
        <ModalTransaction
          modal={modal}
          toggleModal={toggleModal}
          className={""}
          size="lg"
          title={`Transaction from [${walletFrom?.name}] ${userFrom?.name}'s wallet to [${walletTo?.name}] ${userTo?.name}'s wallet`}
          external={externalCloseBtn}
          selectedWalletsFrom={walletFrom}
          makeTransaction={makeTransaction}
        />
      </Container>
    </>
  );
};

export default TransferCoin;

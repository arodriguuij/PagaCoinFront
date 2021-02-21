import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "reactstrap";
import axios from "axios";
import ItemList from "../ItemList";
import UserCreation from "./UserCreation";
import WalletCreation from "./WalletCreation";
import {
  setUserName,
  addWallets,
  resetWallets,
  setWalletName,
  setWalletQuantity,
  addWalletIds,
  resetWalletIds,
} from "../../redux/ducks/newUser";

const UserAndWalletsCreation = () => {
  const userName = useSelector((state) => state.newUser.name);
  const walletIds = useSelector((state) => state.newUser.walletIds);
  const wallets = useSelector((state) => state.newUser.wallets);
  const newWallet = useSelector((state) => state.newUser.newWallet);

  const dispatch = useDispatch();

  const [isAddWalletDisabled, setIsAddWalletDisabled] = useState(false);

  const handleUserNameChange = (e) => {
    dispatch(setUserName(e.target.value));
  };
  const handleWalletNameChange = (e) => {
    dispatch(setWalletName(e.target.value));
  };
  const handleWalletQuantityChange = (e) => {
    dispatch(setWalletQuantity(parseInt(e.target.value)));
  };
  const showWallet = () => {
    setIsAddWalletDisabled((prevState) => !prevState);
  };
  const cancelWallet = () => {
    dispatch(setWalletName(""));
    dispatch(setWalletQuantity(null));
    setIsAddWalletDisabled(false);
  };
  const addWallet = () => {
    dispatch(addWallets());
    setIsAddWalletDisabled(false);
  };

  const cleanForm = () => {
    dispatch(setUserName(""));
    dispatch(resetWallets());
    dispatch(resetWalletIds());
    dispatch(setWalletName(""));
    dispatch(setWalletQuantity(null));
    setIsAddWalletDisabled(false);
  };

  const handleSubmit = () => {
    wallets.map(async (wallet) => {
      try {
        const walletPromise = await axios.post("/wallets", {
          name: wallet.name,
          quantity: wallet.quantity,
        });
        dispatch(addWalletIds(walletPromise.data.id));
      } catch (error) {
        console.log(error);
      }
    });
  };

  const fetchUser = async () => {
    try {
      await axios.post("/users", {
        name: userName,
        wallets: walletIds,
      });
      cleanForm();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (wallets.length && wallets.length === walletIds.length) fetchUser();
  }, [walletIds]);

  return (
    <>
      <h2>User And Wallets Creation</h2>
      <Container className="d-inline-flex p-2 col-example">
        <Container className="App">
          <Form className="form card">
            <div className="d-inline-flex p-2 col-example">
              <UserCreation
                userName={userName}
                handleUserNameChange={handleUserNameChange}
                showWallet={showWallet}
                isAddWalletDisabled={isAddWalletDisabled}
              />
              {isAddWalletDisabled && (
                <WalletCreation
                  handleWalletNameChange={handleWalletNameChange}
                  handleWalletQuantityChange={handleWalletQuantityChange}
                  addWallet={addWallet}
                  walletName={newWallet.name}
                  walletsQuantity={newWallet.quantity}
                  cancelWallet={cancelWallet}
                />
              )}
            </div>
            <Button
              type="button"
              color="primary"
              onClick={handleSubmit}
              style={{ margin: "1rem" }}
              disabled={
                wallets.length === 0 || !userName || isAddWalletDisabled
              }
            >
              SAVE
            </Button>
          </Form>
        </Container>
        {wallets.length !== 0 && (
          <div className="card">
            <ItemList
              items={wallets}
              onHandleSelect={() => {}}
              title={"Provisional Wallets"}
              show={"name"}
              showMore={"quantity"}
              type={"double"}
              color="info"
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default UserAndWalletsCreation;

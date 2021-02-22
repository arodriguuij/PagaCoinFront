import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "reactstrap";
import ItemList from "../ItemList/ItemList";
import UserCreation from "./UserCreation";
import WalletCreation from "./WalletCreation";
import {
  setUserName,
  addWallets,
  setWalletName,
  setWalletQuantity,
  postUser,
  reset,
  resetNewWallet,
} from "../../redux/ducks/newUser";
import { postWallet } from "../../redux/ducks/wallet";

const isEmptyObject = (obj) =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object;

const UserAndWalletsCreation = () => {
  const userName = useSelector((state) => state.newUser.name);
  const walletIds = useSelector((state) => state.newUser.walletIds);
  const wallets = useSelector((state) => state.newUser.wallets);
  const newWallet = useSelector((state) => state.newUser.newWallet);

  const dispatch = useDispatch();

  const [isAddWalletDisabled, setIsAddWalletDisabled] = useState(
    isEmptyObject(newWallet)
  );

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
    dispatch(resetNewWallet());
    setIsAddWalletDisabled(false);
  };
  const addWallet = () => {
    dispatch(addWallets());
    dispatch(resetNewWallet());
    setIsAddWalletDisabled(false);
  };

  const handleSubmit = () => {
    wallets.map(async (wallet) => {
      dispatch(
        postWallet({
          name: wallet.name,
          quantity: wallet.quantity,
        })
      );
    });
  };

  useEffect(() => {
    if (wallets.length && wallets.length === walletIds.length) {
      dispatch(
        postUser({
          name: userName,
          wallets: walletIds,
        })
      );
      dispatch(reset());
    }
  }, [walletIds]);

  useEffect(() => {
    if (!isEmptyObject(newWallet)) {
      setIsAddWalletDisabled(true);
    } else {
      setIsAddWalletDisabled(false);
    }
  }, [newWallet]);

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
              data-testid="submit-user"
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

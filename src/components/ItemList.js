import React from "react";

import { Container, ListGroup, Button } from "reactstrap";

const TransactionsItem = (
  userFromName,
  walletFromName,
  quantity,
  userToName,
  walletToName
) => {
  return `${userFromName} wallet[${walletFromName}] -> ${quantity}$ -> ${userToName} wallet[${walletToName}]`;
};
const SimpleItem = (show) => {
  return `${show}`;
};
const Doubletem = (show, showMore) => {
  return `${show} - ${showMore}$`;
};

const ItemList = ({
  items,
  onHandleSelect,
  onHandleTransactionsByWallets,
  onHandleAllTransactions,
  color,
  show,
  showMore,
  title,
  titleExtra,
  type,
}) => {
  return (
    <Container className="App">
      <h4>{title}</h4> <p>{titleExtra}</p>
      <div style={{ width: "100%" }}>
        <ListGroup>
          {items.map((item, index) => (
            <Button
              key={index}
              color={color ? color : "secondary"}
              style={{ margin: "0.3rem" }}
              onClick={() => onHandleSelect(item)}
            >
              {type === "transactions" ? (
                TransactionsItem(
                  item.userFromName,
                  item.walletFromName,
                  item.quantity,
                  item.userToName,
                  item.walletToName
                )
              ) : type === "simple" ? (
                SimpleItem(item[show])
              ) : type === "double" ? (
                Doubletem(item[show], item[showMore])
              ) : (
                <div className="flexItem">
                  <div>{item[show]}</div>
                  <div>
                    <Button
                      onClick={() =>
                        onHandleTransactionsByWallets(item, "wallets")
                      }
                      color="warning"
                    >
                      Transactions by wallets
                    </Button>{" "}
                    <Button
                      onClick={() =>
                        onHandleAllTransactions(item, "transactions")
                      }
                      color="info"
                    >
                      All Transactions
                    </Button>
                  </div>
                </div>
              )}
            </Button>
          ))}
        </ListGroup>
      </div>
    </Container>
  );
};

export default ItemList;

import React from "react";
import { Navbar, Nav } from "reactstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar
      color="light"
      light
      expand="md"
      className="bg-light justify-content-between"
    >
      <Link to="/" className="header-link">
        PagaCoin
      </Link>
      <Nav className="mr-auto" navbar>
        <Link to="/userAndWalletsCreation" className="header-link">
          User and wallets creation
        </Link>
        <Link to="/transferCoins" className="header-link">
          Transfer coins
        </Link>
        <Link to="/transactions" className="header-link">
          Balances and Transactions
        </Link>
      </Nav>
    </Navbar>
  );
};

export default Header;

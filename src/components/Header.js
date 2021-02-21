import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar
      color="light"
      light
      expand="md"
      className="bg-light justify-content-between"
    >
      <NavbarBrand href="/">PagaCoin</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <Link to="/userAndWalletsCreation">
            <NavLink>User and wallets creation</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/transferCoins">
            <NavLink>Transfer coins</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/transactions">
            <NavLink>Transactions</NavLink>
          </Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;

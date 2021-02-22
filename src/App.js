import { Switch, Route } from "react-router-dom";

import { TransferCoin } from "./components/transferCoin";
import { UserAndWalletsCreation } from "./components/usersAndWalletsCreations";
import { Transactions } from "./components/transactions";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/transferCoins">
          <TransferCoin />
        </Route>
        <Route path="/userAndWalletsCreation">
          <UserAndWalletsCreation />
        </Route>
        <Route path="/transactions">
          <Transactions />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;

import { Provider } from "react-redux";
import store from "./redux/configureStore";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";

const allTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

const pagaCoinRender = (ui, options) =>
  render(ui, { wrapper: allTheProviders, ...options });

export * from "@testing-library/react";
export default pagaCoinRender;

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/common/App";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import "./fonts/font.css";

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

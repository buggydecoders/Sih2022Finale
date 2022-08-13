import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";


// redux setup
import { PersistGate } from "redux-persist/integration/react";
import Store from "./store";
import { Provider } from "react-redux";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store().store}>
    <PersistGate loading={null} persistor={Store().persistor}>
      <React.StrictMode>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";
import store from "./redux/store/store";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
  </StrictMode>
);

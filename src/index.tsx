import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import store from "./store/store";
import { Provider as ReduxProvider } from "react-redux";
import {ThemeType} from "./interfaces/slices/SliceStates";

import "./index.scss";
import SnackbarProvider from "./providers/SnackbarProvider";


const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
document.title = "Productify ToDo App";

const currentTheme: ThemeType = localStorage.getItem("theme") as ThemeType;
if (!currentTheme) localStorage.setItem("theme", "light");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    try {
      navigator.serviceWorker.register("/service-worker.js").then(() => {
        console.log("service-worker.js loaded");
      })
      navigator.serviceWorker.register("/firebase-messaging-sw.js")
      .then((registration: ServiceWorkerRegistration) => {
        console.log("Registration successful, scope is:", registration.scope);
      }).catch((err) => {
        console.log("Service worker registration failed, error:", err);
      });
    } catch (error) {
      console.log(error);
    }
  })
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ReduxProvider>
    </BrowserRouter>
   </React.StrictMode>
);

//Wrapper for Context etc and root file

import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import { ThemeProvider } from "./utility/darkmode/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./utility/AuthContext";
import { RecipesProvider } from "./utility/RecipesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RecipesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RecipesProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

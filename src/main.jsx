import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import React from "react";

import { AuthProvider } from "./contexts/AuthContext";
import { BooksProvider } from "./contexts/BooksContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BooksProvider>
        <App />
      </BooksProvider>
    </AuthProvider>
  </React.StrictMode>
);

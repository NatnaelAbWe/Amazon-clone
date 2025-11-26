import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./Component/DataProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <DataProvider>
        <App />
      </DataProvider>
    </StrictMode>
  </BrowserRouter>
);

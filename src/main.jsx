import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-datepicker/dist/react-datepicker.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalContex } from "./contex/GlobalContex.jsx";
import { BrowserRouter } from "react-router-dom";
const queryClients = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClients}>
      <GlobalContex>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalContex>
    </QueryClientProvider>
  </StrictMode>,
);

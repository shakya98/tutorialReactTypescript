import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./Componants/Layout/Layout";

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Layout>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </Layout>
);

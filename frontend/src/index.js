import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "./component/Redux/store";
import "./index.css";
import Product from "./component/pages/products";
import SingleProduct from "./component/pages/singleProduct";
import Login from "./component/pages/login";
import StockMovements from "./component/pages/stockMovements";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import Orders from "./component/pages/orders"

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
const accessToken = sessionStorage.getItem("token");

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/products"
            element={<Product />}
          />
          <Route
            path="/login"
            element={!accessToken ? <Login /> : <Navigate to="/products" />}
          />
          <Route
            path={"/products/:id"}
            element={accessToken ? <SingleProduct /> : <Navigate to="/login" />}
          />
          <Route
            path="/stockMovements"
            element={
              accessToken ? <StockMovements /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/orders"
            element={accessToken ? <Orders /> : <Orders />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

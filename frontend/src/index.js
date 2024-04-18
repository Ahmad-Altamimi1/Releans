import React from "react";
import ReactDOM from "react-dom";
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

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
const accessToken = sessionStorage.getItem("token") !== null;

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<Product />} />
          {/* <Route
            path="/login"
            element={!accessToken ? <Login /> : <Navigate to="/products" />}
          /> */}
          <Route path="/login" element={<Login />} />
          <Route path={"/products/:id"} element={<SingleProduct />} />
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

reportWebVitals();

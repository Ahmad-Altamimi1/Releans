import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path={"/products/:id"} element={<SingleProduct />} />
          <Route path="/stockMovements" element={<StockMovements />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

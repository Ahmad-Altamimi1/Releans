import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import SendNotification from "../../Functions/SendNotification";
import { useQuery } from "react-query";

import {
  SendNotiToUpdateNumber,
  SendNotiToUpdateData,
} from "../../Redux/action";
import { useSelector, useDispatch } from "react-redux";

const fetchProducts = async () => {
  const accessToken = sessionStorage.getItem("token");

  try {
    const response = await axios.get("/products", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.products;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

const EditProductForm = ({ id, onEditComplete }) => {
  const dispatch = useDispatch();
  const countofNoti = useSelector((state) => state.NotiCount);
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery("products", fetchProducts);
  const [formData, setFormData] = useState({
    movement_type: "",
    quantity: "",
    productId: "",
  });
  const [OldData, setOldData] = useState({
    movement_type: "",
    quantity: "",
    productId: "",
  });

  useEffect(() => {
    const fetchMovment = async () => {
      try {
        const csrfResponse = await axios.get("/get-csrf-token");
        const csrfToken = csrfResponse.data.token;

        axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
        const response = await axios.get(`/movements/${id}`);
        const movment = response.data.Movement;
        setOldData({
          movement_type: movment.movement_type,
          quantity: movment.quantity,
          productId: movment.productId,
        });

        setFormData({
          movement_type: movment.movement_type,
          quantity: movment.quantity,
          productId: movment.productId,
        });
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchMovment();
  }, [id, onEditComplete]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/movements/${id}`, formData);
      document.querySelector("#edit_Move").click();
      onEditComplete();
      const newProductId = response.data.movement.productId;
      SendNotification(formData, newProductId, "editMovment", OldData);

      dispatch(SendNotiToUpdateNumber(parseInt(countofNoti) + 1));

      console.log("Movment updated successfully");
    } catch (error) {
      console.error("Error updating Movment:", error.message);
    }
  };

  return (
    <div id="edit_Move" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Movment</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  Movement Name <span className="text-danger">*</span>
                </label>
                <select
                  name="movement_type"
                  className="form-control"
                  type="text"
                  value={formData.movement_type}
                  onChange={handleChange}
                >
                  <option value="deduction">Deduction</option>
                  <option value="addition">Addition</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  Product Name <span className="text-danger">*</span>
                </label>
                <select
                  name="productId"
                  className="form-control"
                  type="text"
                  value={formData.productId}
                  onChange={handleChange}
                >
                  <option value="">--------</option>

                  {products.map((product) => (
                    <>
                      <option value={product.id}>{product.name}</option>
                    </>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  Quantity <span className="text-danger">*</span>
                </label>
                <input
                  name="quantity"
                  className="form-control"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="submit-section">
                <button
                  type="submit"
                  name="edit_product"
                  className="btn btn-primary submit-btn"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;

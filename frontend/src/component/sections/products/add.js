import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import SendNotification from "../../Functions/SendNotification";
import { useSelector, useDispatch } from "react-redux";

import {
  SendNotiToUpdateNumber,
  SendNotiToUpdateData,
} from "../../Redux/action";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const countofNoti = useSelector((state) => state.NotiCount);

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
    MinimumNumberAllowedInstock: "",
  });

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
      const csrfResponse = await axios.get("/get-csrf-token");
      const csrfToken = csrfResponse.data.token;

      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
      console.log(formData);
      const response = await axios.post("/products", formData);
      dispatch(SendNotiToUpdateNumber(parseInt(countofNoti) + 1));

      const newProductId = response.data.product.id;
      SendNotification(formData, newProductId, "add");
      console.log("Product added successfully");
      setFormData({
        name: "",
        quantity: "",
        price: "",
        description: "",
        MinimumNumberAllowedInstock: "",
      });
      document.querySelector("#add_leave").click();
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  return (
    <div id="add_leave" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Product</h5>
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
                  Product Name <span className="text-danger">*</span>
                </label>
                <input
                  name="name"
                  className="form-control"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
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
              <div className="form-group">
                <label>
                  Price <span className="text-danger">*</span>
                </label>
                <input
                  name="price"
                  className="form-control"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>
                  Minimum number allowed in stock{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="MinimumNumberAllowedInstock"
                  className="form-control"
                  type="number"
                  value={formData.MinimumNumberAllowedInstock}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  name="description"
                  rows={4}
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="submit-section">
                <button
                  type="submit"
                  name="add_product"
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

export default AddProductForm;

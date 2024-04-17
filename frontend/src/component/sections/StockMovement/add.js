import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import SendNotification from "../../Functions/SendNotification";
import { useSelector, useDispatch } from "react-redux";

import {
  SendNotiToUpdateNumber,
  SendNotiToUpdateData,
} from "../../Redux/action";

const AddMovementForm = () => {
  const dispatch = useDispatch();
  const countofNoti = useSelector((state) => state.NotiCount);

  const [formData, setFormData] = useState({
    movement_type: "",
    quantity: "",
    price: "",
  });

  const handleChange = (e) => {
    const { movement_type, value } = e.target;
    setFormData({
      ...formData,
      [movement_type]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const csrfResponse = await axios.get("/get-csrf-token");
      const csrfToken = csrfResponse.data.token;

      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
      console.log(formData);
      const response = await axios.post("/movements", formData);
      dispatch(SendNotiToUpdateNumber(parseInt(countofNoti) + 1));

      const newMovementId = response.data.Movement.id;
      SendNotification(formData, newMovementId, "add");
      console.log("Movement added successfully");
      setFormData({
        productId: "",
        quantity: "",
        price: "",
        description: "",
        MinimumNumberAllowedInstock: "",
      });
      document.querySelector("#add_leave").click();
    } catch (error) {
      console.error("Error adding Movement:", error.message);
    }
  };

  return (
    <div id="add_leave" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Movement</h5>
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
                <input
                  name="name"
                  className="form-control"
                  type="text"
                  value={formData.movement_type}
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
                  name="add_Movement"
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

export default AddMovementForm;

import React, { useState } from "react";
import axios from "axios";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
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
      await axios.post("http://127.0.0.1:8000/api/products", formData);
      // Handle success, e.g., show a success message or redirect the user
      console.log("Product added successfully");
      console.log(formData);

      setFormData({
        name: "",
        quantity: "",
        price: "",
        description: "",
      });
    } catch (error) {
      // Handle error, e.g., show an error message
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

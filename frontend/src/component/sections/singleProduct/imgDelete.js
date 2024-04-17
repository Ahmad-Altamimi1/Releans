import { Link } from "react-router-dom";
import axios from "axios";
import SendNotification from "../../Functions/SendNotification";

export default function ({ id, onEditComplete }) {
  const deleteImage = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api//${id}`
      );
      console.log("response", response);
      const newProductId = response.data.product.id;
      const formData = response.data.product;
      SendNotification(formData, newProductId, "delete");
      onEditComplete();
      document.querySelector("#delete_approve").click();

      return response.data;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  };

  return (
    <>
      <div
        className={`modal custom-modal fade show`}
        id="delete_image"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Image</h3>
                <p>Are you sure want to delete this Image?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <Link
                      className="btn btn-danger delete-btn"
                      onClick={() => {
                        deleteImage();
                      }}
                    >
                      Delete
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link
                      to="javascript:void(0);"
                      data-dismiss="modal"
                      className="btn btn-secondary cancel-btn"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

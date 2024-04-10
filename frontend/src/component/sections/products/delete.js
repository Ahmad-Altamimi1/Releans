import { Link } from "react-router-dom";
import axios from "axios";

export default function ({ id, onEditComplete }) {
  const deleteProduct = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/products/${id}`
      );
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
        id="delete_approve"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Leave</h3>
                <p>Are you sure want to delete this leave?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <Link
                      className="btn btn-primary continue-btn"
                      onClick={() => {
                        deleteProduct();
                      }}
                    >
                      Delete
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link
                      to="javascript:void(0);"
                      data-dismiss="modal"
                      className="btn btn-primary cancel-btn"
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
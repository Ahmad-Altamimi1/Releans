import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Edit from "../products/edit";
import Delete from "../products/delete";
import ImageUploadForm from "./imgAdd";
import ImageDeleteForm from "./imgDelete";
import { Link, useParams } from "react-router-dom";


export default function () {

   const [deleteImage, setdeleteImage] = useState(false);

  const { id } = useParams();
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);

      return response.data;
    } catch (error) {
      throw new Error("Network response was not ok");
    }
  };



  const {
    data: singleProduct,
    isLoading,
    error,
    refetch,
  } = useQuery("singleProduct", fetchProduct);
  const handleRefetch = () => {
    refetch();
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(singleProduct);
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">
                  product
                </h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.php">
                      Dashboard
                    </a>
                  </li>
                  <li className="breadcrumb-item active">
                    product
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card tab-box">
            <div className="row user-tabs">
              <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#emp_Product"
                    >
                      {' '}Product Information{' '}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#emp_projects"
                    >
                      {' '}Product Status{' '}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#bank_statutory"
                    >
                      {' '}Stock History{' '}
                      <small className="text-danger">
                        (Admin Only)
                      </small>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------- Product Information start----------------------------------------------------------- */}


          <div className="tab-content">
            <div
              className="pro-overview tab-pane fade show active"
              id="emp_Product"
            >

              <div className="row">
                <div className="col-md-8 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Product Images{' '}
                        <a
                          className="edit-icon"
                          data-target="#add-product-image"
                          data-toggle="modal"
                          href="#"
                        >
                          <i className="fa fa-camera" />
                        </a>
                      </h3>




                      {/* --- img map start ---- */}



                      {singleProduct.images.length > 0 ? (
                        singleProduct.images.map((image, index) => (
                          <div key={index} className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                            <div className="uploaded-box">
                              <div className="uploaded-img">
                                <img
                                  alt="a"
                                  className="img-fluid"
                                  src={image.image}
                                />
                              </div>
                              <div className="uploaded-img-name">
                                {/* {image.image} */}

                                
                                  <Link
                                    to="#"
                                    className="btn btn-danger"
                                    data-toggle="modal"
                                    data-target="#delete_image"
                                    onClick={()=>{
                                      setdeleteImage(image.id);
                                    }}
                                  >
                                    <i className="fa fa-trash" /> Delete image
                                  </Link>
                                
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="mt-5 p-5">
                          <p className="account-title ">
                            The Product Does Not Have Images
                          </p>
                          <p className="account-subtitle text-center">
                            You can add Images to the product from the <i class="fa fa-camera" aria-hidden="true"></i> Button in the top-right
                          </p>
                        </div>
                      )}

                      {/* --- img map end ---- */}




                    </div>
                  </div>
                </div>

                <div className="col-md-4 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Product Information{' '}
                        <a
                          className="edit-delete-icon mx-1"
                          data-target="#delete_approve"
                          data-toggle="modal"
                          href="#"
                        >
                          <i className="fa fa-trash-o" />
                        </a>

                        <a
                          className="edit-icon"
                          data-target="#edit_leave"
                          data-toggle="modal"
                          href="#"
                        >
                          <i className="fa fa-pencil" />
                        </a>

                      </h3>

                      <ul className="personal-info">
                        <li>
                          <div className="title">
                            ID:
                          </div>
                          <div className="text">
                            {singleProduct.product.id}
                            {singleProduct.product.id}
                          </div>
                        </li>
                        <li>
                          <div className="title">
                            Name:
                          </div>
                          <div className="text">
                            {singleProduct.product.name}
                          </div>
                        </li>
                        <li>
                          <div className="title">
                            Description:
                          </div>
                          <div className="text">
                            {singleProduct.product.description}
                          </div>
                        </li>
                      </ul>
                      <hr />

                      <ul className="personal-info">
                        <li>
                          <div className="title">
                            Price:
                          </div>
                          <div className="text">
                            {singleProduct.product.price}$
                          </div>
                        </li>
                        <li>
                          <div className="title">
                            Quantity:
                          </div>
                          <div className="text">
                            {singleProduct.product.quantity}
                          </div>
                        </li>
                        <li>
                          <div className="title">
                            Added In:{' '}
                          </div>
                          <div className="text">
                            {singleProduct.product.created_at}
                          </div>
                        </li>
                        <li>
                          <div className="title">
                            Number Of Interested:{' '}
                          </div>
                          <div className="text">
                            #####
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --------------------------------------------------- Product Information end ----------------------------------------------------------- */}

            {/* --------------------------------------------------- product status start ----------------------------------------------------------- */}

            <div
              className="tab-pane fade"
              id="emp_projects"
            >
              <div class="row">
                <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                  <div class="stats-info">
                    <h6>Products Sold</h6>
                    <h4>### <span>this month</span></h4>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                  <div class="stats-info">
                    <h6>Overall Profit</h6>
                    <h4>### <span>this month</span></h4>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                  <div class="stats-info">
                    <h6>Comment</h6>
                    <h4>##</h4>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                  <div class="stats-info">
                    <h6>Review Rating</h6>
                    <h4>5</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* --------------------------------------------------- product status end ----------------------------------------------------------- */}

            {/* --------------------------------------------------- Stock History start----------------------------------------------------------- */}


            <div
              className="tab-pane fade"
              id="bank_statutory"
            >
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">
                    {' '}Basic Salary Information
                  </h3>
                  <form>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Salary basis{' '}
                            <span className="text-danger">
                              *
                            </span>
                          </label>
                          <select className="select">
                            <option>
                              Select salary basis type
                            </option>
                            <option>
                              Hourly
                            </option>
                            <option>
                              Daily
                            </option>
                            <option>
                              Weekly
                            </option>
                            <option>
                              Monthly
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Salary amount{' '}
                            <small className="text-muted">
                              per month
                            </small>
                          </label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                $
                              </span>
                            </div>
                            <input
                              className="form-control"
                              defaultValue="0.00"
                              placeholder="Type your salary amount"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Payment type
                          </label>
                          <select className="select">
                            <option>
                              Select payment type
                            </option>
                            <option>
                              Bank transfer
                            </option>
                            <option>
                              Check
                            </option>
                            <option>
                              Cash
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <h3 className="card-title">
                      {' '}PF Information
                    </h3>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            PF contribution
                          </label>
                          <select className="select">
                            <option>
                              Select PF contribution
                            </option>
                            <option>
                              Yes
                            </option>
                            <option>
                              No
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            PF No.{' '}
                            <span className="text-danger">
                              *
                            </span>
                          </label>
                          <select className="select">
                            <option>
                              Select PF contribution
                            </option>
                            <option>
                              Yes
                            </option>
                            <option>
                              No
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Employee PF rate
                          </label>
                          <select className="select">
                            <option>
                              Select PF contribution
                            </option>
                            <option>
                              Yes
                            </option>
                            <option>
                              No
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Additional rate{' '}
                            <span className="text-danger">
                              *
                            </span>
                          </label>
                          <select className="select">
                            <option>
                              Select additional rate
                            </option>
                            <option>
                              0%
                            </option>
                            <option>
                              1%
                            </option>
                            <option>
                              2%
                            </option>
                            <option>
                              3%
                            </option>
                            <option>
                              4%
                            </option>
                            <option>
                              5%
                            </option>
                            <option>
                              6%
                            </option>
                            <option>
                              7%
                            </option>
                            <option>
                              8%
                            </option>
                            <option>
                              9%
                            </option>
                            <option>
                              10%
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Total rate
                          </label>
                          <input
                            className="form-control"
                            defaultValue="11%"
                            placeholder="N/A"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Employee PF rate
                          </label>
                          <select className="select">
                            <option>
                              Select PF contribution
                            </option>
                            <option>
                              Yes
                            </option>
                            <option>
                              No
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Additional rate{' '}
                            <span className="text-danger">
                              *
                            </span>
                          </label>
                          <select className="select">
                            <option>
                              Select additional rate
                            </option>
                            <option>
                              0%
                            </option>
                            <option>
                              1%
                            </option>
                            <option>
                              2%
                            </option>
                            <option>
                              3%
                            </option>
                            <option>
                              4%
                            </option>
                            <option>
                              5%
                            </option>
                            <option>
                              6%
                            </option>
                            <option>
                              7%
                            </option>
                            <option>
                              8%
                            </option>
                            <option>
                              9%
                            </option>
                            <option>
                              10%
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Total rate
                          </label>
                          <input
                            className="form-control"
                            defaultValue="11%"
                            placeholder="N/A"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <h3 className="card-title">
                      {' '}ESI Information
                    </h3>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            ESI contribution
                          </label>
                          <select className="select">
                            <option>
                              Select ESI contribution
                            </option>
                            <option>
                              Yes
                            </option>
                            <option>
                              No
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            ESI No.{' '}
                            <span className="text-danger">
                              *
                            </span>
                          </label>
                          <select className="select">
                            <option>
                              Select ESI contribution
                            </option>
                            <option>
                              Yes
                            </option>
                            <option>
                              No
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Employee ESI rate
                          </label>
                          <select className="select">
                            <option>
                              Select ESI contribution
                            </option>
                            <option>
                              Yes
                            </option>
                            <option>
                              No
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Additional rate{' '}
                            <span className="text-danger">
                              *
                            </span>
                          </label>
                          <select className="select">
                            <option>
                              Select additional rate
                            </option>
                            <option>
                              0%
                            </option>
                            <option>
                              1%
                            </option>
                            <option>
                              2%
                            </option>
                            <option>
                              3%
                            </option>
                            <option>
                              4%
                            </option>
                            <option>
                              5%
                            </option>
                            <option>
                              6%
                            </option>
                            <option>
                              7%
                            </option>
                            <option>
                              8%
                            </option>
                            <option>
                              9%
                            </option>
                            <option>
                              10%
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Total rate
                          </label>
                          <input
                            className="form-control"
                            defaultValue="11%"
                            placeholder="N/A"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        className="btn btn-primary submit-btn"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal custom-modal fade"
          id="profile_info"
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Profile Information
                </h5>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                >
                  <span aria-hidden="true">
                    ×
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="profile-img-wrap edit-img">
                        <img
                          alt="user"
                          className="inline-block"
                          src="assets/img/profiles/avatar-02.jpg"
                        />
                        <div className="fileupload btn">
                          <span className="btn-text">
                            edit
                          </span>
                          <input
                            className="upload"
                            type="file"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              First Name
                            </label>
                            <input
                              className="form-control"
                              defaultValue="John"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Last Name
                            </label>
                            <input
                              className="form-control"
                              defaultValue="Doe"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Birth Date
                            </label>
                            <div className="cal-icon">
                              <input
                                className="form-control datetimepicker"
                                defaultValue="05/06/1985"
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Gender
                            </label>
                            <select className="select form-control">
                              <option value="male selected">
                                Male
                              </option>
                              <option value="female">
                                Female
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          Address
                        </label>
                        <input
                          className="form-control"
                          defaultValue="4487 Snowbird Lane"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          State
                        </label>
                        <input
                          className="form-control"
                          defaultValue="New York"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Country
                        </label>
                        <input
                          className="form-control"
                          defaultValue="United States"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Pin Code
                        </label>
                        <input
                          className="form-control"
                          defaultValue="10523"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Phone Number
                        </label>
                        <input
                          className="form-control"
                          defaultValue="631-889-3206"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Department{' '}
                          <span className="text-danger">
                            *
                          </span>
                        </label>
                        <select className="select">
                          <option>
                            Select Department
                          </option>
                          <option>
                            Web Development
                          </option>
                          <option>
                            IT Management
                          </option>
                          <option>
                            Marketing
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Designation{' '}
                          <span className="text-danger">
                            *
                          </span>
                        </label>
                        <select className="select">
                          <option>
                            Select Designation
                          </option>
                          <option>
                            Web Designer
                          </option>
                          <option>
                            Web Developer
                          </option>
                          <option>
                            Android Developer
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Reports To{' '}
                          <span className="text-danger">
                            *
                          </span>
                        </label>
                        <select className="select">
                          <option>
                            -
                          </option>
                          <option>
                            Wilmer Deluna
                          </option>
                          <option>
                            Lesley Grauer
                          </option>
                          <option>
                            Jeffery Lalor
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Edit id={singleProduct.product.id} onEditComplete={handleRefetch} />
        <Delete id={singleProduct.product.id} onEditComplete={handleRefetch} />
        <ImageUploadForm id={singleProduct.product.id} onEditComplete={handleRefetch}/>
        {deleteImage && <ImageDeleteForm id={deleteImage} onEditComplete={handleRefetch} />}
      </div>
    </>
  );
}

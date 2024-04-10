import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";
import { Link } from "react-router-dom";

const fetchProducts = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/products");
    // console.log(response.data.products[0]);
    return response.data.products;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export default function () {
  const [editpage, seteditpage] = useState(false);
  const [deletePage, setdeletePage] = useState(false);
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery("products", fetchProducts);
  const handleRefetch = () => {
    refetch();
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <>
        <div className="page-wrapper">
          {/* Page Content */}
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Products</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="index.php">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Products</li>
                  </ul>
                </div>
                <div className="col-auto float-right ml-auto">
                  <Link
                    to="#"
                    className="btn add-btn"
                    data-toggle="modal"
                    data-target="#add_leave"
                  >
                    <i className="fa fa-plus" /> Add Product
                  </Link>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table table-striped custom-table mb-0 datatable">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {products &&
                        products.map((product) => (
                          <>
                            <tr>
                              <td>{product.name}</td>
                              <td>{product.description}</td>
                              <td>{product.price}</td>
                              <td>{product.quantity}</td>
                              <td className="text-right">
                                <div className="dropdown dropdown-action">
                                  <Link
                                    to="#"
                                    className="action-icon dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="material-icons">more_vert</i>
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      data-toggle="modal"
                                      data-target="#edit_leave"
                                      data-id={product.id}
                                      onClick={() => {
                                        seteditpage(product.id);
                                      }}
                                    >
                                      <i className="fa fa-pencil m-r-5" /> Edit
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      data-toggle="modal"
                                      data-target="#delete_approve"
                                      onClick={() => {
                                        setdeletePage(product.id);
                                      }}
                                    >
                                      <i className="fa fa-trash-o m-r-5" />{" "}
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </>
                        ))}
                    </tbody>
                    {/*?php $cnt+=1;
										}
									}?*/}
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Content */}
          {/* Add Leave Modal */}
          {/* /Delete Leave Modal */}
        </div>
      </>
      <Add />
      {editpage && <Edit id={editpage} onEditComplete={handleRefetch} />}
      {deletePage && <Delete id={deletePage} onEditComplete={handleRefetch} />}
    </>
  );
}

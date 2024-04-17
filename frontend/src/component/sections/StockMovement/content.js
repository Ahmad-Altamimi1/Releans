import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";
import { Link } from "react-router-dom";

const fetchMovements = async () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  try {
    const response = await axios.get(`${baseUrl}/movements`);

    return response.data.movements;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export default function () {
  const [editpage, seteditpage] = useState(false);
  const [deletePage, setdeletePage] = useState(false);
  const {
    data: Movements,
    isLoading,
    error,
    refetch,
  } = useQuery("movements", fetchMovements);
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
                  <h3 className="page-title">Movements</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="index.php">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Movements</li>
                  </ul>
                </div>
                <div className="col-auto float-right ml-auto">
                  <Link
                    to="javascript:void(0)"
                    className="btn add-btn"
                    data-toggle="modal"
                    data-target="#add_leave"
                  >
                    <i className="fa fa-plus" /> Add Movement
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
                        <th>Movement Type</th>
                        <th>By</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {Movements &&
                        Movements.map((Movement) => (
                          <>
                            <tr>
                              <td>{Movement.movement.movement_type}</td>
                              <td>{Movement.userName}</td>
                              <td>{Movement.productName}</td>
                              <td>{Movement.movement.quantity}</td>
                              <td className="text-right">
                                <div className="dropdown dropdown-action">
                                  <Link
                                    to="javascript:void(0)"
                                    className="action-icon dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="material-icons">more_vert</i>
                                  </Link>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <Link
                                      className="dropdown-item"
                                      to="javascript:void(0)"
                                      data-toggle="modal"
                                      data-target="#edit_leave"
                                      data-id={Movement.id}
                                      onClick={() => {
                                        seteditpage(Movement.id);
                                      }}
                                    >
                                      <i className="fa fa-pencil m-r-5" /> Edit
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="javascript:void(0)"
                                      data-toggle="modal"
                                      data-target="#delete_approve"
                                      onClick={() => {
                                        setdeletePage(Movement.id);
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

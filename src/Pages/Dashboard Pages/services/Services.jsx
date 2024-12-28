import React, { useEffect, useState } from 'react'
import Header from '../../../Components/Admin Components/header/Header';
import SideNav from '../../../Components/Admin Components/sideNav/SideNav';
import img1 from "../../../images/Logo.png";
import PageHeader from '../../../Components/Common/page header/PageHeader';
import { useDeleteServiceMutation, useGetServicesQuery } from '../../../api/servicesSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const { data: services, error, isLoading, refetch } = useGetServicesQuery();
  const navigate = useNavigate();
  const [deleteService] = useDeleteServiceMutation();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    refetch();
    document.body.classList.remove("sidebar-icon-only"); // Close sidebar on page change
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteService(id).unwrap();
          refetch();
          Swal.fire('Deleted!', 'Service has been deleted successfully.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Something went wrong while trying to delete the service.', 'error');
        }
      }
    });
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="Food Products" icon="fa fa-cogs" />
          </div>
          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="p-3">
                  <h3 className="latest_users mt-2 mb-3 text-center">
                    <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                    All Food Products
                    <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                    <hr />
                  </h3>
                  <div className="table-responsive">
                    {isLoading ? (
                      <div className="center-loader">
                        <div className="loader"></div>
                      </div>
                    ) : error ? (
                      <div>Error loading users</div> // Display error message if there is an error
                    ) : (
                      <div>
                        <table className="table text-center table-hover">
                          <thead className="table-dark">
                            <tr style={{ fontWeight: "bold" }}>
                              <th># </th>
                              <th> Code </th>
                              <th> Brand </th>
                              <th> Name </th>
                              <th> Price </th>
                              <th> Action </th>
                            </tr>
                          </thead>
                          <tbody>
                            {services.data
                              .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                              .map((service, index) => (
                                <tr key={service.id}>
                                  <td>{currentPage * itemsPerPage + index + 1} </td>
                                  <td>{service.Barcode}</td>
                                  <td>{service.Brand}</td>
                                  <td>{service["Name-En"]}</td>
                                  <td>{service["Pc Price"]}</td>
                                  <td>
                                    <button
                                      className="btn text-success"
                                      title="تعديل"
                                      onClick={() => navigate(`/admin/edit-service/${service.id}`)}
                                    >
                                      <i className="fa fa-edit" aria-hidden="true"></i>
                                    </button>
                                    <button
                                      className="btn text-danger"
                                      onClick={() => handleDelete(service.id)}
                                      title="حذف"
                                    >
                                      <i className="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        <div className="pagination d-flex justify-content-center">
                          {Array.from(Array(Math.ceil(services.data.length / itemsPerPage)).keys()).map((page) => (
                            <button
                              className={`btn mx-1 btn-outline-dark ${page === currentPage ? 'active' : ''}`}
                              key={page + 1}
                              onClick={() => changePage(page)}
                            >
                              {page + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;


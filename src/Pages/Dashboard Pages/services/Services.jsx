import React, { useEffect } from 'react'
import Header from '../../../Components/Admin Components/header/Header';
import SideNav from '../../../Components/Admin Components/sideNav/SideNav';
import img1 from "../../../images/Logo.png";
import PageHeader from '../../../Components/Common/page header/PageHeader';
import { useDeleteServiceMutation, useGetServicesQuery } from '../../../api/servicesSlice';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';

const Services = () => {
  const { data: services, error, isLoading ,refetch } = useGetServicesQuery();
  const navigate = useNavigate();
  const [deleteService] = useDeleteServiceMutation();
  useEffect(() => {
    refetch();
    document.body.classList.remove("sidebar-icon-only") // Close sidebar on page change
  },[]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "لن تتمكن من التراجع عن هذا!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، احذفها!',
      cancelButtonText: 'إلغاء',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteService(id).unwrap();
          refetch();
          Swal.fire('تم الحذف!', 'تم حذف الخدمة بنجاح.', 'success');
        } catch (error) {
          Swal.fire('خطأ!', 'حدث خطأ أثناء محاولة حذف الخدمة.', 'error');
        }
      }
    });
  };
  return (
    <div>
    <Header />
    <div className="page-body-wrapper">
      <SideNav />
      <div className="add_user_container">
        <div style={{ marginTop: "30px" }}>
          <PageHeader name=" الخدمات" icon="fa fa-cogs" />
        </div>
        <div className="row content-wrapper">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="p-3">
                <h3 className="latest_users mt-2 mb-3 text-center">
                  <i
                    className="fa fa-angle-double-left"
                    aria-hidden="true"
                  ></i>
                  كل الخدمات
                  <i
                    className="fa fa-angle-double-right"
                    aria-hidden="true"
                  ></i>
                  <hr />
                </h3>
                <div className="table-responsive">
                  {isLoading ? (
                          <div className="center-loader">
                              <div class="loader"></div>
                          </div>
                      ) : error ? (
                      <div>Error loading users</div> // Display error message if there is an error
                      ) : (
                  <table className="table text-center table-hover">
                    <thead className="table-dark">
                      <tr style={{ fontWeight: "bold" }}>
                        <th># </th>
                        <th> الاسم </th>
                        <th>الوصف</th>
                        <th>السعر</th>
                        <th>الصوره</th>
                        <th> اجراء </th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service,index) => (
                        <tr key={service.id}>
                          <td>{index + 1} </td>{" "}
                          {/* Tracking ID as the user ID */}
                          <td>{service.title}</td>
                          <td>{service.description}</td>
                          <td>{service.price}</td>
                          <td>
                            <img
                              src={`https://xealkhalej-backend.alwajez.com/${service.image}`}
                              alt="user"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td>
                            <button
                              className="btn text-success"
                              title="تعديل"
                              onClick={() => navigate(`/admin/edit-service/${service.id}`)}
                            >
                              <i
                                className="fa fa-edit"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <button className="btn text-danger" onClick={() => handleDelete(service.id)} title="حذف">
                              <i
                                className="fa fa-trash"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Services

import React, { useEffect } from 'react'
import Header from '../../../Components/Admin Components/header/Header';
import SideNav from '../../../Components/Admin Components/sideNav/SideNav';
import img1 from "../../../images/Logo.png";
import PageHeader from '../../../Components/Common/page header/PageHeader';
import { useDeleteBookingMutation, useGetBookingsQuery } from '../../../api/bookingSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const {data: bookings, isLoading, isError, error ,refetch} = useGetBookingsQuery();
  const [deleteBooking] = useDeleteBookingMutation();
  const navigate = useNavigate();
  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only") // Close sidebar on page change
  }, []);
  useEffect(() => {
    refetch();
  }, [refetch]);
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
          await deleteBooking(id).unwrap();
          refetch();
          Swal.fire('تم الحذف!', 'تم حذف الحجز بنجاح.', 'success');
        } catch (error) {
          Swal.fire('خطأ!', 'حدث خطأ أثناء محاولة حذف الحجز.', 'error');
        }
      }
    });
  }

  return (
    <div>
    <Header />
    <div className="page-body-wrapper">
      <SideNav />
      <div className="add_user_container">
        <div style={{ marginTop: "30px" }}>
          <PageHeader name=" الحجوزات" icon="fa fa-cogs" />
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
                  كل الحجوزات
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
                        <th> اسم العميل </th>
                        <th>الخدمه</th>
                        <th>حالة الدفع</th>
                        <th>حالة الحجز</th>
                        <th>تاريخ الحجز</th>
                        <th> اجراء </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.bookings.map((booking,index) => (
                        <tr key={booking.id}>
                          <td>{index + 1} </td>{" "}
                          {/* Tracking ID as the user ID */}
                          <td>{booking.client_name}</td>
                          <td>{booking.service.title}</td>
                          <td>{booking.payment_status === "paid" ? <span className='badge badge-success'>تم الدفع</span> : <span className='badge badge-warning'>انتظار</span>}</td>
                          <td>{booking.booking_status === "approved" ? <span className='badge badge-success'>تمت</span> : booking.booking_status == "rejected" ? <span className='badge badge-danger'>مرفوضة</span> : <span className='badge badge-warning'>انتظار</span>}</td>
                          <td>{new Date(booking.created_at).toLocaleString('en')}</td>
                          
                          <td>
                            <button
                              className="btn text-success"
                              title="تعديل"
                              onClick={() => navigate(`/admin/edit-booking/${booking.id}`)}
                            >
                              <i
                                className="fa fa-edit"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <button className="btn text-danger" onClick={() => handleDelete(booking.id)} title="حذف">
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

export default Bookings

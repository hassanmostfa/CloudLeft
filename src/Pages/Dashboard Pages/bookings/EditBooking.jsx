import React, { useState, useEffect } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetBookingByIdQuery, useUpdateBookingMutation } from "../../../api/bookingSlice";
import { useGetServicesQuery } from "../../../api/servicesSlice";

const EditBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the booking ID from the URL

  const { data: services, isLoading: servicesLoading } = useGetServicesQuery();
  const { data: booking, isLoading: bookingLoading } = useGetBookingByIdQuery(id);

  
  const [updateBooking] = useUpdateBookingMutation(); // API hook to update booking
  const paymentGates = [
    { id: 1, name: "paypal" },
    { id: 2, name: "stripe" },
    { id: 3, name: "cash" },
  ];

  const [formData, setFormData] = useState({
    client_name: "",
    client_phone: "",
    client_email: "",
    service_id: "",
    notes: "",
    payment_status: "",
    booking_status: "",
    payment_gate: "",
  });

  const [error, setError] = useState({});

  useEffect(() => {
    if (booking && !bookingLoading) {
        setFormData({
            client_name: booking.booking.client_name,
            client_phone: booking.booking.client_phone,
            client_email: booking.booking.client_email,
            service_id: booking.booking.service_id,
            notes: booking.booking.notes,
            payment_status: booking.booking.payment_status,
            booking_status: booking.booking.booking_status,
            payment_gate: booking.booking.payment_gate,
            id: booking.booking.id,
            service_name: booking.booking.service_name,
          });
    }
  }, [booking , bookingLoading]);
  
  if (servicesLoading || bookingLoading) {
    return (
      <div className="center-main-loader">
        <div className="main-loader"></div>
      </div>
    );
  }

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.client_name === "") {
      setError({ ...error, client_name: "Client name is required" });
      return;
    }

    try {
      await updateBooking({ id, ...formData }).unwrap(); // Send updated data to the backend
      if (formData.payment_status === "paid" && booking.booking.payment_status !== "paid") {
      }
      Swal.fire("تم!", "تم تحديث الحجز بنجاح.", "success");
      navigate("/admin/bookings");
    } catch (err) {
      console.error("Failed to update booking:", err);
      setError(err);
      Swal.fire("خطأ!", "حدث خطأ أثناء محاولة تحديث الحجز.", "error");
    }
  };

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="تعديل الحجز" icon="fa fa-calendar-edit" />
          </div>
          <div className="row content-wrapper">
            <div className="col-12 stretch-card content-wrapper">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">نموذج تعديل الحجز</h4>
                  <form className="forms-sample" onSubmit={handleSubmit}>
                  {error?.data?.errors?.length > 0 && (
                    <div className="alert alert-danger">
                      {error.data.errors.map((error, index) => (
                        <p key={index}>{error}</p>
                      ))}
                    </div>
                  )}
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="client_name">الاسم</label>
                        <input
                          type="text"
                          className="form-control"
                          id="client_name"
                          name="client_name"
                          value={formData.client_name}
                          onChange={handleChange}
                          placeholder="أدخل الاسم"
                        />
                        {error.client_name && (
                          <p className="text-danger">{error.client_name}</p>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="client_phone">الهاتف</label>
                        <input
                          type="text"
                          className="form-control"
                          id="client_phone"
                          name="client_phone"
                          value={formData.client_phone}
                          onChange={handleChange}
                          placeholder="أدخل الهاتف"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="client_email">البريد الإلكتروني</label>
                        <input
                          type="email"
                          className="form-control"
                          id="client_email"
                          name="client_email"
                          value={formData.client_email}
                          onChange={handleChange}
                          placeholder="أدخل البريد الإلكتروني"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="service_id">الخدمة</label>
                        <select
                          className="form-control"
                          id="service_id"
                          name="service_id"
                          value={formData.service_id}
                          onChange={handleChange}
                        >
                          <option value="">اختر خدمة</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="payment_status">حالة الدفع</label>
                        <select
                          className="form-control"
                          id="payment_status"
                          name="payment_status"
                          value={formData.payment_status}
                          onChange={handleChange}
                        >
                          <option value="pending">قيد الانتظار</option>
                          <option value="paid">تم الدفع</option>
                          <option value="cancelled">ملغي</option>
                        </select>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="booking_status">حالة الحجز</label>
                        <select
                          className="form-control"
                          id="booking_status"
                          name="booking_status"
                          value={formData.booking_status}
                          onChange={handleChange}
                        >
                          <option value="pending">قيد الانتظار</option>
                          <option value="approved">تمت</option>
                          <option value="rejected">مرفوض</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="notes">ملاحظات</label>
                      <textarea
                        className="form-control"
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="أدخل ملاحظات إضافية"
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-center gap-2">
                      <button type="submit" className="btn btn-gradient-primary">
                        حفظ
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/admin/bookings")}
                        className="btn btn-gradient-danger"
                      >
                        إلغاء
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBooking;

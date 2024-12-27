import React, { useState, useEffect } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} from "../../../api/servicesSlice";

const EditService = () => {
  const navigate = useNavigate();
  const { id: serviceId } = useParams();
  const [error, setError] = useState(null);
  const { data: service, isLoading } = useGetServiceByIdQuery(serviceId);
  const [updateService, { isLoading: isUpdating, error: updateError }] =
    useUpdateServiceMutation();

  const [formData, setFormData] = useState({
    title: "",
    country_id: "",
    image: null,
    price: "",
    description: "",
    features: [
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
    ],
  });

  const [oldImage, setOldImage] = useState(null);

  useEffect(() => {
    if (service && !isLoading) {
      setFormData({
        title: service.title,
        country_id: service.country_id,
        image: null,
        price: service.price,
        description: service.description,
        features: service.features.map((feature, index) => ({
          title: feature?.title || "",
          description: feature?.description || "",
        })),
      });
      setOldImage(
        service.image ? `https://xealkhalej-backend.alwajez.com/${service.image}` : null
      );
    }
  }, [service, isLoading]);
  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only") // Close sidebar on page change
  }, []);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFeatureChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFeatures = [...formData.features];
    updatedFeatures[index][name] = value;
    setFormData({ ...formData, features: updatedFeatures });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = new FormData();

    serviceData.append("title", formData.title);
    serviceData.append("country_id", formData.country_id);
    serviceData.append("price", formData.price);
    serviceData.append("description", formData.description);

    if (formData.image) {
      serviceData.append("image", formData.image);
    }

    // Append features array
    formData.features.forEach((feature, index) => {
      serviceData.append(`features[${index}][title]`, feature.title);
      serviceData.append(
        `features[${index}][description]`,
        feature.description
      );
    });

    try {
      await updateService({
        id: serviceId,
        updatedService: serviceData,
      }).unwrap();
      navigate("/admin/services");
    } catch (error) {
      console.error("Failed to update service:", error);
      setError(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="تعديل خدمة" icon="fa fa-edit" />
          </div>
          <div className="col-12 grid-margin stretch-card content-wrapper">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <i className="mdi mdi-account-plus"></i> نموذج تعديل خدمة
                </h4>
                <p className="card-description">
                  الرجاء ملء الحقول التالية والتأكد من صحة البيانات قبل التأكيد
                </p>
                <form
                  className="forms-sample"
                  onSubmit={handleSubmit}
                  enctype="multipart/form-data"
                >
                  {/* Title Field */}
                  {error?.data?.errors?.length > 0 && (
                    <div className="alert alert-danger">
                      {updateError.data.errors.map((error, index) => (
                        <p key={index}>{error}</p>
                      ))}
                    </div>
                  )}
                  <div className="row">
                    <div className="form-group col-sm-6">
                      <label htmlFor="title">الاسم</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Price Field */}
                    <div className="form-group col-sm-6">
                      <label htmlFor="price">السعر</label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                      {updateError?.data?.errors?.price && (
                        <p className="text-danger">
                          {updateError.data.errors.price}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    {/* Country Field */}
                    <div className="form-group col-sm-6">
                      <label htmlFor="country_id">اختر الدولة</label>
                      <select
                        className="form-control"
                        name="country_id"
                        value={formData.country_id}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          اختر الدولة
                        </option>
                        
                      </select>
                    </div>
                    {/* Image Upload */}
                    <div className="form-group col-sm-6">
                      <label htmlFor="image">الصورة</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={handleChange}
                        name="image"
                      />
                      {oldImage && (
                        <div className="mt-2">
                          <p>الصورة الحالية:</p>
                          <img
                            src={oldImage}
                            alt="Service"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description Field */}
                  <div className="form-group col-sm-12">
                    <label htmlFor="description">الوصف</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Features Fields */}
                  {formData.features.map((feature, index) => (
                    <div key={index} className="feature-group row">
                      <div className="form-group col-sm-6">
                        <label htmlFor={`feature${index}_title`}>
                          عنوان الميزة {index + 1}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`feature${index}_title`}
                          name="title"
                          value={feature.title}
                          onChange={(e) => handleFeatureChange(index, e)}
                          required={index === 0}
                        />
                      </div>

                      <div className="form-group col-sm-6">
                        <label htmlFor={`feature${index}_description`}>
                          وصف الميزة {index + 1}
                        </label>
                        <textarea
                          className="form-control"
                          id={`feature${index}_description`}
                          name="description"
                          value={feature.description}
                          onChange={(e) => handleFeatureChange(index, e)}
                        />
                        {updateError?.data?.errors?.[
                          `features.${index}.description`
                        ] && (
                          <p className="text-danger">
                            {
                              updateError.data.errors[
                                `features.${index}.description`
                              ]
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Submit Button */}
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      type="submit"
                      className="btn btn-gradient-primary"
                      disabled={isUpdating}
                    >
                      تحديث
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/admin/services");
                      }}
                      className="btn btn-gradient-danger"
                    >
                      الغاء
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditService;

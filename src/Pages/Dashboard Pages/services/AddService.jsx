import React, { useEffect, useState } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import { useNavigate } from "react-router-dom";
import { useCreateServiceMutation } from "../../../api/servicesSlice";

const AddService = () => {
  const navigate = useNavigate();
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
      { title: "", description: "" }
    ]
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [createService,  {isSuccess, error:createError} ] = useCreateServiceMutation();
  const [error , setError] = useState({})
  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only") // Close sidebar on page change
  }, []);
  const handleChange = (e) => {
    if (e.target.type === 'file') {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });

      // Image Preview
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else if (e.target.name.startsWith("feature")) {
      const index = Number(e.target.name.split("_")[1]) - 1;
      const key = e.target.name.includes("title") ? "title" : "description";
      const updatedFeatures = [...formData.features];
      updatedFeatures[index][key] = e.target.value;
      setFormData({ ...formData, features: updatedFeatures });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "features") {
        formData.features.forEach((feature, index) => {
          formDataToSend.append(`features[${index}][title]`, feature.title);
          formDataToSend.append(`features[${index}][description]`, feature.description);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    try{
      await createService(formDataToSend).unwrap();
      navigate("/admin/services");
    }catch(err){
      setError(err)
    }
    
  };

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="اضافة خدمة" icon="fa fa-plus" />
          </div>
          <div className="col-12 grid-margin stretch-card content-wrapper">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <i className="mdi mdi-account-plus"></i> نموذج اضافة خدمة جديد
                </h4>
                <p className="card-description">
                  الرجاء ملء الحقول التالية والتاكد من صحة البيانات قبل التاكيد
                </p>
                {error?.data?.errors?.length > 0 && (
                  <>
                  
                    {error.data.errors.map((error, index) => (
                    <div className="alert alert-danger">
                        <p key={index}>{error}</p>
                        </div>
                    ))}
                  </>
                  )}
                <form className="forms-sample" onSubmit={handleSubmit}>
                  <div className="form-group col-sm-12">
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="title">الاسم</label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          placeholder="ادخل الاسم"
                          value={formData.title}
                          onChange={handleChange}
                          name="title"
                        />
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="price">السعر</label>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          placeholder="ادخل السعر"
                          value={formData.price}
                          onChange={handleChange}
                          name="price"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group col-sm-12">
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="image">الصورة</label>
                        <input
                          type="file"
                          className="form-control"
                          id="image"
                          onChange={handleChange}
                          name="image"
                        />
                        {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="country_id"> اختر الدولة </label>
                        <select
                          dir="ltr"
                          className="form-control form-select"
                          value={formData.country_id}
                          onChange={handleChange}
                          name="country_id"
                        >
                          <option value="" disabled>
                            اختر الدولة
                          </option>
                          
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">الوصف</label>
                    <textarea
                      className="form-control"
                      placeholder="ادخل الوصف"
                      value={formData.description}
                      onChange={handleChange}
                      name="description"
                    />
                  </div>

                  {formData.features.map((feature, index) => (
                    <div key={index} className="form-group row">
                      <div className="col-sm-6">
                        <label htmlFor={`feature_title_${index + 1}`}>الميزة {index + 1}</label>
                        <input
                          type="text"
                          className="form-control"
                          id={`feature_title_${index + 1}`}
                          placeholder="ادخل الميزة"
                          value={feature.title}
                          onChange={handleChange}
                          name={`feature_${index + 1}_title`}
                        />
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor={`feature_desc_${index + 1}`}>وصف الميزة {index + 1}</label>
                        <textarea
                          className="form-control"
                          id={`feature_desc_${index + 1}`}
                          placeholder="ادخل وصف الميزة"
                          value={feature.description}
                          onChange={handleChange}
                          name={`feature_${index + 1}_description`}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="d-flex justify-content-center gap-2">
                    <button type="submit" className="btn btn-gradient-primary me-2">
                      {"انشاء"}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/admin/services")}
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

export default AddService;
